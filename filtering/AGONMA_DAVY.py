import streamlit as st
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def init_data(users, films):
    """Initialise une matrice avec des notes vides (-1 signifie non noté)."""
    data = pd.DataFrame(-1, index=users, columns=films)
    return data

@st.cache_data
def compute_similarity_matrix(df):
    """Calcule la matrice de similarité item-item."""
    df = df.replace(-1, np.nan).fillna(0)  # Remplacer les valeurs manquantes par 0
    similarity_matrix = pd.DataFrame(cosine_similarity(df.T),
                                     index=df.columns,
                                     columns=df.columns)
    return similarity_matrix

def predict_rating(df, similarity_matrix, user, film):
    """Prédit une note pour un film donné en fonction des similarités."""
    # Vérifier si le film a déjà été noté
    if df.loc[user, film] != -1:
        return df.loc[user, film], False  # La note existe déjà, donc pas prédite
    
    # Si la note n'est pas donnée, on fait la prédiction
    if film not in similarity_matrix.index:
        return None, False  # Impossible de prédire
    
    user_ratings = df.loc[user]
    similar_films = similarity_matrix[film].drop(index=film, errors='ignore')
    
    valid_ratings = user_ratings[user_ratings != -1]
    # On s'assure que les films validés sont dans la matrice de similarité
    valid_films = similar_films.index.intersection(valid_ratings.index)
    
    if len(valid_films) == 0:
        return None, False  # Impossible de prédire

    weighted_sum = np.dot(valid_ratings.loc[valid_films], similar_films.loc[valid_films])
    similarity_sum = similar_films.loc[valid_films].sum()
    
    if similarity_sum == 0:
        return None, False  # Impossible de prédire
    
    return round(weighted_sum / similarity_sum, 2), True  # Note prédite



# Interface Streamlit
st.title("🎬Système de Recommandation - Filtrage Collaboratif Item-Item")
st.sidebar.header("🔹 Options")


# Ajout du nom et description dans la barre latérale
st.sidebar.subheader("Créé par : AGONMA DAVY")
st.sidebar.write("Ce système de recommandation utilise le filtrage collaboratif item-item pour prédire les notes des films manquantes.")


# Demander le nombre d'utilisateurs et de films
num_users = st.sidebar.number_input("Nombre d'utilisateurs :", min_value=1, step=1, value=3)
num_films = st.sidebar.number_input("Nombre de films :", min_value=1, step=1, value=3)

# Saisie des noms
user_names = [st.text_input(f"Utilisateur {i+1}", key=f"user_{i}") for i in range(num_users)]
film_names = [st.text_input(f"Film {i+1}", key=f"film_{i}") for i in range(num_films)]

# Option de chargement d'un CSV
file = st.sidebar.file_uploader("Charger un fichier CSV", type="csv")
if file is not None:
    data = pd.read_csv(file)
    st.session_state.data = data
    st.success("CSV chargé avec succès.")

if st.button("Créer la matrice de notes"):
    if all(user_names) and all(film_names):
        st.session_state.data = init_data(user_names, film_names)
        st.success("Matrice initialisée !")
    else:
        st.warning("Veuillez remplir tous les champs.")

# Vérifier si la matrice est initialisée
if "data" in st.session_state:
    st.subheader("📝 Saisie des Notes")
    st.warning("Laissez sur -1 pour les films non notés.")
    for user in st.session_state.data.index:
        for film in st.session_state.data.columns:
            note = st.slider(f"{user} - {film}", min_value=1, max_value=5, value=-1, step=1, format="%d")
            if note != -1:
                st.session_state.data.loc[user, film] = note
    
    # Affichage des notes sous forme de tableau
    st.subheader("📊 Tableau des Notes")
    st.table(st.session_state.data.replace(-1, "Non Noté"))

    similarity_matrix = compute_similarity_matrix(st.session_state.data)

    
    # Afficher les notes prédites pour les films manquants
    if st.button("Afficher les notes prédites pour les films manquants"):
        predictions = st.session_state.data.copy()
        for user in st.session_state.data.index:
            for film in st.session_state.data.columns:
                if st.session_state.data.loc[user, film] == -1:
                    predicted_note, is_predicted = predict_rating(st.session_state.data, similarity_matrix, user, film)
                    if predicted_note is not None:
                        predictions.loc[user, film] = predicted_note  # Assurer que predicted_note est une seule valeur (pas une liste ou tuple)
        st.subheader("📈 Table des prédictions")
        st.table(predictions)


    # Option d'exportation des prédictions
    if st.button("Exporter les prédictions"):
        predictions = st.session_state.data.copy()
        for user in st.session_state.data.index:
            for film in st.session_state.data.columns:
                if st.session_state.data.loc[user, film] == -1:
                    predicted_note = predict_rating(st.session_state.data, similarity_matrix, user, film)
                    if predicted_note:
                        predictions.loc[user, film] = predicted_note
        predictions_csv = predictions.to_csv(index=True)
        st.download_button(label="Télécharger le CSV des prédictions", data=predictions_csv, file_name="predictions.csv")

    
    st.subheader("🔍 Rechercher une Recommandation")

    # Sélection des utilisateurs et films
    search_user = st.selectbox("Sélectionnez un utilisateur", st.session_state.data.index)
    search_film = st.selectbox("Sélectionnez un film", st.session_state.data.columns)

    # Bouton pour obtenir la prédiction
    if st.button("Voir la recommandation"):
        predicted, is_predicted = predict_rating(st.session_state.data, similarity_matrix, search_user, search_film)
        
        if predicted is not None:
            if is_predicted:
                # Si la note est prédite
                st.success(f"Note prédite pour '{search_film}' par {search_user} : {predicted}")
            else:
                # Si la note existe déjà
                st.success(f"Note existante pour '{search_film}' par {search_user} : {predicted}")
                
            # Recommandation basée sur la note
            if predicted >= 4:
                st.success(f"📌 Ce film est recommandé pour {search_user} !")
            else:
                st.warning(f"🚫 Ce film n'est pas recommandé pour {search_user}.")
        else:
            # Si la note ne peut pas être prédite
            st.error(f"Impossible de prédire une note pour '{search_film}' pour {search_user}.")



