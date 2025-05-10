"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { updatedAt } from "@/utils/constants";
import { useEffect } from "react";

export default function Politiques() {
    useEffect(() => {
        localStorage.removeItem('route')
    }, [])



    const politiques = [
        {
            question: '1. Qui nous sommes.',
            det: '',
            details: [
                {
                    title: '1.1 Les Services de Espace Show+.',
                    detail: <p>Bienvenue chez Espace Show+ ! Avant d'utiliser notre plateforme, veuillez prendre le temps de lire et comprendre les politiques de confidentialité ci-dessous et vous assurer que cela vous convienne. Grâce à notre plateforme, à nos applications mobiles et à nos services, nous permettons aux gens, partout dans le monde, de créer, découvrir, partager, s’inscrire et de participer à des événements.</p>
                },
                {
                    title: '1.2 Qui est qui.',
                    detail: <p> Lorsque la présente Politique de confidentialité utilise le terme « Organisateur », nous voulons parler de créateurs d'événements qui ont recours à nos services afin de créer des événements destinés aux consommateurs et qui se servent de nos services pour (a) consommer les informations , ou participer à des événements (les « Consommateurs »), ou (b) pour toute autre raison. Les Organisateurs, les Consommateurs et les tierces parties qui utilisent nos Services sont tous désignés collectivement dans les présentes par « utilisateurs », « vous », « votre » ou « vos ». <br /> <br /> La présente plateforme ci-après dénommée "Espace Show+" fournie par la société ADEFORITI FLACANDJI TECH GROUP SARL ci-après dénommée "AFT GROUP SARL"; collectivement dénommée "nous", "notre", "nos" , " AFT GROUP SARL", "Espace Show+", "AFT GROUP SARL/Espace Show+"</p>
                },
            ]
        },
        {
            question: '2. Notre Déclaration de confidentialité.',
            det: '',
            details: [
                {
                    title: '2.1 Application.',
                    detail: <p>La présente politique de confidentialité énonce notre politique en ce qui concerne les informations qui peuvent être associées ou liées à une personne en particulier et/ou qui pourraient être utilisées pour identifier une personne (« Données personnelles ») et qui sont collectées auprès des utilisateurs sur les services. Cette politique couvre également les données personnelles collectées auprès des clients et prospects de AFT GROUP SARL. Nous prenons au sérieux la confidentialité de vos données personnelles. Pour cette raison, nous avons créé la présente Politique de confidentialité que nous vous demandons de lire car elle comprend des informations importantes concernant vos données personnelles et d’autres informations.</p>
                },
                {
                    title: '2.2. Les « Données non personnelles »',
                    detail: <p>Les « Données non personnelles » qui sont utilisées dans la présente Politique de confidentialité sont donc toute information non associée à une personne et/ou ne pouvant pas être utilisée pour identifier une personne. Lorsque vous interagissez avec nos services, nous pouvons également recueillir des données non personnelles. <br /> <br />Les limites et les exigences de la présente Politique de confidentialité sur notre collecte, utilisation, communication, transfert et stockage/conservation des données personnelles ne sont pas applicables aux données non personnelles.</p>
                }
            ]
        },
        {
            question: '3. Données personnelles que nous collectons.',
            det: "Lorsque vous utilisez ou interagissez avec nous à travers nos services ou lorsque vous collaborez avec AFT GROUP SARL en tant que client de Espace Show+, nous pouvons recueillir des données personnelles vous concernant. Quelques fois ce sera pour notre propre compte et quelques fois, ce sera pour le compte d'un Organisateur qui utilise nos services pour organiser un événement.Il s'agit d'une distinction importante aux fins des lois sur la protection des données, et cela est expliqué plus amplement ci- dessous.",
            details: [

                {
                    title: '3.1 Informations collectées auprès de tous les Utilisateurs.',
                    detail: <p>Les informations que vous nous fournissez : pour tous les Utilisateurs, nous collectons des Données personnelles lorsque vous fournissez volontairement ces informations aux services, par exemple lorsque vous vous inscrivez pour accéder aux services, lorsque vous nous contactez pour transmettre vos questions, lorsque vous répondez à l'une de nos enquêtes ou lorsque vous parcourez ou utilisez certaines parties des services. Les Données personnelles que nous recueillons comprennent sans s'y limiter, vos prénom, nom, adresse, adresse e-mail, numéro de téléphone et toute autre information personnellement identifiable concernant un Utilisateur. <br /><br />Les informations que nous collectons automatiquement : nous collectons également automatiquement certaines données techniques qui nous sont envoyées par l'ordinateur, le périphérique mobile et/ou le navigateur à travers lequel vous accédez à nos services (les « Données automatiques »). Les Données automatiques incluent, sans s'y limiter, un identificateur unique associé à votre dispositif d'accès et/ou votre navigateur [y compris par exemple votre adresse de protocole Internet (IP)], des caractéristiques sur votre dispositif d'accès et/ou votre navigateur, des statistiques sur vos activités sur les services, des informations sur la manière dont vous avez accédé aux à nos services et les Données recueillies par les cookies, les pixels espions, les objets locaux partagés, le stockage web et d’autres technologies similaires. Nous et nos fournisseurs utilisons ces technologies pour collecter des informations en temps réel sur la manière dont vous utilisez et naviguez dans nos services. Il peut s'agir d'informations sur votre comportement de navigation, vos visites de pages, vos clics et mouvements de curseur et vos recherches sur nos sites. Les informations (y compris votre adresse IP) collectées par ces technologies sont divulguées ou collectées directement par ces fournisseurs, qui les utilisent pour nous aider à évaluer votre utilisation des services. <br /><br />Lorsque vous vous inscrivez pour accéder aux Services ou lorsque vous nous soumettez des données personnelles, nous pouvons associer d'autres données non personnelles (y compris les Données non personnelles que nous collectons auprès de tiers) à vos données personnelles. À ce moment-là, nous traiterons ces données combinées comme des Données personnelles jusqu’à ce qu’elles ne puissent plus être associées à vous ni utilisées pour vous identifier.  </p>
                },
                {
                    title: '3.2 Informations collectées auprès des Organisateurs.',
                    detail: <p>Si vous êtes un Organisateur, nous collecterons des données personnelles supplémentaires auprès de vous. Les informations que vous nous fournissez : dans certains cas, nous pouvons recueillir vos renseignements de carte de crédit (par exemple, votre numéro de carte de crédit et sa date d'expiration, l’adresse de facturation, etc.), dont certains peuvent constituer des données personnelles, pour sécuriser certains paiements. En outre, si vous utilisez d'autres services de traitement des paiements, nous recueillerons auprès de vous les renseignements d'ordre financier (par ex., vos coordonnées bancaires ou une adresse pour effectuer les paiements) nécessaires pour faciliter les paiements et les renseignements nécessaires à des fins fiscales (par exemple, votre numéro d'identification de contribuable). Les informations que nous obtenons à partir d'autres sources : nous pouvons également recueillir ou recevoir des Données personnelles y compris vos nom, prénom, adresse e-mail et autre information de contact de sources tierces, telles que les sites Web de tiers et les partenaires marketing, de votre banque, de nos partenaires et agences de traitement des paiements et d'agences d'évaluation de crédit.</p>
                },
                {
                    title: '3.3 Informations collectées auprès des Consommateurs.',
                    detail: <p>Si vous êtes un Consommateur, nous collecterons des Données personnelles supplémentaires auprès de vous, quelques fois pour nos propres fins et d'autres fois pour le compte d'un Organisateur (voir la Section 16 ci-dessous pour davantage d'informations). <br /> <br />Les informations que vous nous fournissez via Espace Show+ ou les propriétés de AFT GROUP SARL : si vous vous inscrivez à un événement payant, vous allez fournir des informations financières (par ex. votre numéro de carte de crédit et sa date d'expiration, l’adresse de facturation, etc.), dont certaines peuvent constituer des données personnelles. <br /><br />Les informations que nous obtenons auprès d'autres sources : nous pouvons aussi collecter ou recevoir des données personnelles de sources tierces, comme les organisateurs, d'autres consommateurs, les réseaux sociaux ou d'autres intégrations tierces, la banque émettant votre carte de crédit, nos partenaires de traitement des paiements ou d'autres tierces parties.</p>
                }
            ]
        },
        {
            question: '4. Comment nous utilisons vos données personnelles.',
            det: "Nous collectons et utilisons les données personnelles que nous collectons d’une manière qui est conforme à la présente Politique de confidentialité. Nous pouvons utiliser les Données personnelles comme suit.",
            details: [
                {
                    title: '4.1 Raison spécifique.',
                    detail: <p>Si vous fournissez des données personnelles afin d'accéder à, ou d'utiliser nos services ou toute fonctionnalité, nous utiliserons vos données personnelles pour vous permettre d'accéder à, ou d'utiliser les services ou les fonctionnalités et pour analyser votre utilisation de ces services ou fonctionnalités. Par exemple, si vous fournissez des données personnelles relatives à votre identité ou à votre droit d'utiliser certaines parties de nos services, nous utiliserons ces informations pour prendre une décision quant à l'octroi de cet accès pour utiliser ces services et pour surveiller votre droit continu à utiliser ces Services.</p>
                },
                {
                    title: '4.2 Accès et utilisation.',
                    detail: <p>Si vous êtes un Organisateur, nous collecterons des données personnelles supplémentaires auprès de vous. Les informations que vous nous fournissez : dans certains cas, nous pouvons recueillir vos renseignements de carte de crédit (par exemple, votre numéro de carte de crédit et sa date d'expiration, l’adresse de facturation, etc.), dont certains peuvent constituer des données personnelles, pour sécuriser certains paiements. En outre, si vous utilisez d'autres services de traitement des paiements, nous recueillerons auprès de vous les renseignements d'ordre financier (par ex., vos coordonnées bancaires ou une adresse pour effectuer les paiements) nécessaires pour faciliter les paiements et les renseignements nécessaires à des fins fiscales (par exemple, votre numéro d'identification de contribuable). Les informations que nous obtenons à partir d'autres sources : nous pouvons également recueillir ou recevoir des Données personnelles y compris vos nom, prénom, adresse e-mail et autre information de contact de sources tierces, telles que les sites Web de tiers et les partenaires marketing, de votre banque, de nos partenaires et agences de traitement des paiements et d'agences d'évaluation de crédit.</p>
                },
                {
                    title: '4.3 Raisons commerciales internes.',
                    detail: <p>Nous pouvons utiliser vos données personnelles à des fins commerciales internes, y compris, sans limitation, pour nous aider à améliorer le contenu et les fonctionnalités des services, afin de mieux comprendre nos utilisateurs, pour améliorer nos services, afin de protéger, d'identifier ou de répondre des actes fautifs, pour faire respecter nos conditions d'utilisation, pour gérer votre compte et pour vous fournir un service client et généralement pour gérer les services et nos activités.</p>
                },
                {
                    title: "4.4 Marketing de Espace Show+ et de l'Organisateur.",
                    detail: <p>Nous pouvons utiliser vos données personnelles dans le cadre de nos besoins de marketing et de publicité, y compris (sans limitation), par e-mail, SMS marketing, supports d'affichage et en ciblant d'autres périphériques (comme les tablettes, les appareils mobiles et les téléviseurs). Nous faisons cela pour vous informer à propos des services ou des événements que nous estimons susceptibles de vous intéresser, pour élaborer du matériel promotionnel ou marketing et pour afficher les contenu de AFT GROUP SARL/Espace Show+ ou relatifs aux événements et les publicités qui peuvent, selon nous, vous intéresser sur ou en dehors de nos services. Nous pourrons également faire cela pour le compte d'un Organisateur, par exemple lorsque vos interactions antérieures avec un organisateur suggèrent que vous êtes susceptible d’être intéressé par un type d'événement en particulier. <br />Vous avez la possibilité de vous désabonner à tout moment de nos communications marketing. <br /><br />Vous pourrez également voir des publicités pour nos services sur des sites web tiers, y compris sur les plateformes des réseaux sociaux.Nous fournissons également aux Organisateurs des outils pour les aider à afficher des publicités pour leurs événements sur des sites web tiers et les plateformes des réseaux sociaux.Si vous voyez une publicité sur un site web tiers ou sur la plateforme d'un réseau social, cela peut être parce que nous ou l'organisateur nous sommes engagés auprès de ce tiers ou de cette plateforme de réseau social pour que la publicité soit visible par nos utilisateurs, ou par d'autres personnes ayant des caractéristiques similaires à celles de nos utilisateurs. Dans certains cas, cela peut impliquer le partage de votre adresse e-mail et d'autres coordonnées de contact avec le tiers ou la plateforme de réseau social pour qu'ils puissent vous identifier comme un de nos utilisateurs, ou identifier d'autres individus avec des caractéristiques similaires aux vôtres pour leur montrer des publicités pour nos services (ou pour les événements de nos organisateurs).Si vous ne désirez plus que nous utilisions vos renseignements personnels à ces fins, veuillez nous écrire à: <a className="text-[blue] " href="mailto:contact@espaceshow-plus.com.">contact@espaceshow-plus.com. </a> <br /> <br /> Pour en savoir davantage sur la façon dont nous gérons le marketing sur les réseaux sociaux ou interagissons avec ceux-ci, veuillez vous référer à la section 5.6.</p>
                },
                {
                    title: "4.5. E-mails envoyés par les Organisateurs.",
                    detail: <p>Nous autorisons les Organisateurs à utiliser nos outils e-mail pour communiquer avec les Consommateurs au sujet de leurs événements actuels et passés, donc vous pouvez recevoir des e-mails de notre système provenant de ces organisateurs et que nous envoyons pour leur compte. Si vous vous êtes inscrit à un événement sur les services, votre e-mail est disponible pour cet Organisateur. C'est l'Organisateur et non nous qui est responsable de l'envoi de ces e-mails. Vous pouvez à tout moment vous désabonner de ces communications.</p>
                },
                {
                    title: "4.6 Utilisation des données basées sur les centres d'intérêt.",
                    detail: <p>Nous faisons parfois des déductions sur le type d'événements ou d'activités qui vous intéressent. Nous pouvons utiliser ces déductions pour aider à cibler la publicité ou à personnaliser les recommandations qui vous sont faites, y compris au nom des organisateurs. Nous pouvons le faire de façon agrégée ou généralisée. Par exemple, nous pouvons déterminer que nos utilisateurs qui assistent à de nombreux événements comiques assistent souvent également à des événements ou sont souvent intéressés par des contenus liés à l'endurance. Nous pouvons diriger (ou aider dans la direction) des contenus ou des recommandations liées à la comédie et à l'endurance à ces utilisateurs.</p>
                },
                {
                    title: "4.7 Autres objectifs.",
                    detail: <p>Si nous avons l'intention d'utiliser toute donnée personnelle d'une manière qui n'est pas conforme à la présente Politique de confidentialité, vous serez informé d'une telle utilisation prévue avant que les données personnelles ne soient collectées ou au moment de leur collecte, ou nous obtiendrons votre consentement à la suite de cette collecte, avant ladite utilisation.</p>
                },
                {
                    title: "4.8 Données personnelles agrégées.",
                    detail: <p>Dans un effort continu visant à mieux comprendre et servir nos utilisateurs, nous menons souvent des recherches sur les données démographiques, les intérêts et le comportement de nos clients en nous basant sur les données personnelles et d'autres informations que nous avons collectées. Ces recherches sont généralement menées uniquement sur une base globale et ces informations agrégées ne vous identifient pas personnellement. Lorsque les données personnelles sont sous forme agrégée, aux fins de la présente politique de confidentialité, elles deviennent alors des données non personnelles.</p>
                }
            ]
        },
        {
            question: '5. Comment nous divulguons et transférons vos Données personnelles.',
            det: '',
            details: [
                {
                    title: '5.1 Contexte.',
                    detail: <p>Nous ne travaillons pas dans le domaine de la vente de vos données personnelles. Nous considérons que ces informations sont un élément vital de notre relation avec vous. Par conséquent, nous ne vendrons pas vos données personnelles à des tierces parties, y compris à des annonceurs tiers. Il y a, cependant, certaines circonstances dans lesquelles nous pouvons divulguer, transférer ou partager vos données personnelles avec certains tiers sans vous donner d'autre avis, comme indiqué dans la présente Politique de confidentialité.</p>
                },
                {
                    title: '5.2 Transferts commerciaux.',
                    detail: <p>Alors que nous développons nos activités, nous pourrions vendre ou acheter des entreprises ou des actifs. Dans le cas d'une vente, fusion, réorganisation, dissolution ou autre événement similaire, les données personnelles peuvent faire partie des actifs transférés. Nous pouvons également divulguer vos données personnelles à l’occasion d’une vérification de diligence raisonnable dans le cadre dudit événement. Vous reconnaissez et acceptez que tout successeur ou acquérant de AFT GROUP SARL ou Espace Show+ (ou de ses actifs) aura le droit de continuer d’utiliser vos données personnelles et autres informations conformément aux conditions de la présente Politique de confidentialité.</p>
                },
                {
                    title: '5.3 Sociétés mères, filiales et entreprises affiliées.',
                    detail: <p>Nous pouvons également partager vos données personnelles avec nos sociétés mères, filiales et/ou entreprises affiliées aux fins de la présente Politique de confidentialité. Nos sociétés mères, filiales et sociétés affiliées seront tenues de conserver ces données personnelles conformément à la présente Politique de confidentialité.</p>
                },
                {
                    title: '5.4 Agents, Consultants et Prestataires de services.',
                    detail: <p>Nous pouvons partager vos Données personnelles avec nos sous-traitants et nos prestataires de service qui traitent les données personnelles en notre nom pour effectuer certaines fonctions liées à nos activités. Ces sociétés comprennent nos agences de marketing, les fournisseurs de publicités en ligne, les fournisseurs d'amélioration des données et des fournisseurs de services de données, les fournisseurs de services de sauvegarde et de récupération, les fournisseurs de services d’e-mail, les partenaires de traitement des paiements, l'assistance à la clientèle, l'assistance technique, les sociétés d'hébergement et autres. Lorsque nous engageons une autre société pour exercer ces fonctions, nous pouvons lui fournir des informations, y compris des données personnelles, dans le cadre de l’exercice de ces fonctions.</p>
                },
                {
                    title: '5.5 Organisateurs.',
                    detail: <p>De plus, lorsque vous vous inscrivez à un événement, vous vous abonnez à des communications ou saisissez toute autre donnée personnelle vous concernant  pour participer à l'événement d'un Organisateur, cet organisateur recevra certains informations personnelles vous concernant comme votre nom, prénom, identifiant ou autre. Par exemple, lorsque vous vous inscrivez pour participer à un évènement, l'organisateur reçois la liste des participants avec votre nom, prénom, le type de billet payé, etc... De même, si vous fournissez votre numéro de téléphone portable, vous pourrez recevoir des messages d'information relatifs au service, à l'événement, à l'activité ou des informations pour lesquels vous avez exprimé un intérêt.</p>
                },
                {
                    title: '5.6 Les réseaux sociaux et autres connexions à des tiers.',
                    detail: <p>- Les Plug-ins sur notre application.<br />Espace Show+ peut contenir également des liens vers les réseaux sociaux et autres, par exemple par le biais du bouton « Partager » ou d'autres plug-in. Lorsque vous interagissez avec ces fonctionnalités et liens, votre navigateur établira un lien direct avec les serveurs de ces réseaux et ils recevront des informations sur votre navigateur et votre activité, et peuvent les relier à votre compte utilisateur. Pour plus d'informations sur la façon dont ces réseaux utilisent les données, veuillez voir leurs propres politiques.</p>
                },
                {
                    title: '5.7 Exigences légales.',
                    detail: <p>Nous pouvons divulguer vos données personnelles en réponse à une exigence légale (par exemple), en réponse à une citation à comparaître ou une demande d'application de la Loi, à un tribunal ou un organisme gouvernemental, (y compris en réponse aux autorités publiques pour satisfaire aux exigences de sécurité nationale ou d'application de la loi), ou si nous estimons en toute bonne foi qu'une telle action est nécessaire (a) pour se conformer à une obligation légale, (b) pour protéger ou défendre nos droits, intérêts, biens ou ceux de tiers, (c) pour prévenir ou enquêter sur de possibles actes répréhensibles liés aux services, (d) pour agir en cas d'urgence afin de protéger la sécurité personnelle des utilisateurs de nos services ou du public ; ou (e) pour nous protéger de toute responsabilité légale.</p>
                }
            ]
        },
        {
            question: '6. Comment nous stockons vos Données personnelles.',
            det: "Nous pouvons stocker des données personnelles, ou ces informations peuvent être stockées par des tiers à qui nous les avons transférées conformément à la présente Politique de confidentialité. Nous prenons ce que nous croyons être des mesures raisonnables pour protéger les données personnelles recueillies via nos services contre tout(e) perte, mauvaise utilisation, accès non autorisé, divulgation accidentelle, altération et destruction. Toutefois, aucun(e) réseau, serveur, base de données ni transmission par Internet ou e-mail n'est jamais entièrement sécurisé(e) ni exempt(e) d'erreurs. Par conséquent, vous devez être particulièrement prudent lorsque vous décidez quels renseignements vous nous envoyez électroniquement. Veuillez garder ceci à l'esprit lors de la divulgation de vos données personnelles.",
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '7. Comment vous pouvez accéder à vos données personnelles, les mettre à jour, les corriger ou les supprimer.',
            det: <p>Vous pouvez modifier, mettre à jour ou supprimer certaines de vos données personnelles directement par le biais de votre compte. Dans certains cas, vous pouvez nous demander de corriger et mettre à jour toute donnée personnelle incorrecte en utilisant les coordonnées de contact ci-dessous, et nous étudierons votre demande conformément aux lois en vigueur. <br /><br />Si un Consommateur initie une demande de suppression de données, Espace Show+ est autorisée à supprimer des services ou anonymiser les données personnelles du Consommateur qui en a fait la demande, même si cela entraîne la suppression de sa disponibilité envers l'organisateur via les services. Toutefois, si vous êtes un Consommateur, vous comprenez que même si Espace Show+ supprime ou anonymise vos données personnelles à votre demande ou conformément à la présente Politique, vos données personnelles peuvent toujours rester disponibles dans la propre base de données de l'organisateur si elles ont été transmises à l'organisateur avant que Espace Show+ reçoive la demande ou prenne des mesures concernant toute activité de suppression ou d'anonymisation. Les utilisateurs peuvent également accéder à leurs données personnelles, les mettre à jour, les corriger ou les supprimer et exercer ces droits en utilisant les coordonnées de contact ci-dessous. Nous prendrons en compte et nous répondrons à toutes les demandes conformément à la législation en vigueur. </p>,
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '8. Combien de temps nous conservons vos données personnelles.',
            det: "Nous pouvons conserver vos Données personnelles aussi longtemps que vous êtes enregistré pour utiliser les Services. Vous pouvez supprimer votre compte en allant sur la page Paramètres du compte de votre espace. Cependant, nous pouvons conserver les données personnelles pendant une période supplémentaire comme cela est autorisé ou requis par les lois en vigueur. Même si nous supprimons vos données personnelles, elles peuvent persister sur des supports de sauvegarde ou d'archivage pendant une période supplémentaire pour des raisons légales, fiscales ou réglementaires, ou à des fins commerciales légitimes et légales.",
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '9. Cookies, balises pixel, objets partagés localement, stockage web et technologies similaires.',
            det: "Nous utilisons des cookies, des balises pixel et autres technologies similaires pour améliorer votre expérience utilisateur et collecter des informations sur la manière dont vous utilisez l'application. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur mais cela peut affecter certaines fonctionnalités de l'application.",
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '10. Vos choix.',
            det: "Vous avez plusieurs choix à votre disposition en ce qui concerne vos données personnelles.",
            details: [
                {
                    title: '10.1 Limiter les Données personnelles que vous communiquez.',
                    detail: "Vous pouvez parcourir les services sans fournir de données personnelles (autres que des données automatiques dans la mesure où elles sont considérées comme des données personnelles en vertu des lois en vigueur) ou en limitant les données personnelles que vous fournissez. Si vous choisissez de ne pas fournir de données personnelles ou de limiter les données personnelles que vous fournissez, vous ne serez peut-être pas en mesure d'utiliser certaines fonctionnalités des services. Par exemple, pour acheter des billets en tant que Consommateur, votre nom et votre adresse e-mail seront demandés."
                },
                {
                    title: ' 10.2 Se désabonner des communications électroniques. ',
                    detail: <p><b>a. Communications Marketing de AFT GROUP SARL/Espace Show+.</b><br /> Lorsque cela est conforme avec vos préférences marketing, nous pouvons vous envoyer des communications électroniques de marketing ou de publicité sur les services ou sur des événements sur les services eux-mêmes, dans la mesure où vous êtes inscrit à ces services, ou bien dans la mesure où vous avez acheté un billet et/ou vous êtes inscrit à un événement figurant sur les services. Vous pouvez « vous désabonner » de la réception de ces communications électroniques en cliquant sur le lien « Se désabonner » situé en bas de toute communication électronique. <br /><br /><b>b. Communications initiées par l'organisateur.</b> <br />Les organisateurs peuvent utiliser nos outils de courrier électronique pour envoyer des communications électroniques aux personnes figurant sur leurs listes d'abonnement e-mail, y compris les consommateurs qui se sont inscrits à leurs événements sur les services dans le passé. Bien que ces communications électroniques soient envoyées par le biais de notre système, AFT GROUP SARL/Espace Show+ ne détermine pas le contenu ou les bénéficiaires de ces communications électroniques. Les organisateurs sont tenus d'utiliser nos outils e-mail uniquement en conformité avec toutes les lois en vigueur. Espace Show+ fournit un lien de « Désabonnement » dans chacun de ces e-mails, ce qui permet aux destinataires de « se désabonner » des communications électroniques d’un organisateur donné. <br /><br /><b>c. Communications de transaction ou de réponse.</b> <br />Certaines communications électroniques de Espace Show+ répondent à vos demandes. Par exemple, si vous êtes un consommateur, nous devons vous envoyer par e-mail votre billet ou votre inscription pour le compte de l'organisateur lorsque vous achetez des billets. Pour donner un autre exemple, si vous envoyez un e-mail à notre service clientèle, nous vous répondrons. Nonobstant tout choix de désabonnement que vous puissiez faire, vous recevrez toujours ces communications transactionnelles ou réactives. Vous pouvez arrêter de recevoir ces types d'e-mails uniquement en nous contactant. En choisissant de ne plus recevoir de communications électroniques de notre part ou par le biais de notre système, vous ne recevrez plus de mises à jour sur les événements que vous avez créés (y compris les questions relatives au paiement) ou sur des événements auxquels vous êtes inscrit pour y participer (y compris les e-mails contenant vos billets). Nous ne recommandons pas de le faire sauf si vous souhaitez ne plus utiliser les Services, si vous n’êtes actuellement inscrit à aucun événement, si vous n’organisez actuellement aucun événement et si vous n’avez plus besoin de recevoir de communications de notre part ou par le biais de notre système. <br /><br /> <b>d. Conservation.</b> <br />Nous pouvons avoir besoin d’un délai de (48) quarante-huit heures ou allant jusqu’à (07) sept jours pour traiter une demande de désabonnement. Même après votre désabonnement de toutes les communications électroniques, nous conserverons vos données personnelles conformément à la présente Politique de confidentialité, cependant, nous ne les utiliserons plus pour vous contacter. Toutefois, les organisateurs qui ont reçu vos données personnelles conformément à la présente Politique de confidentialité peuvent utiliser encore ces données personnelles pour vous contacter conformément à leurs propres Politiques de confidentialité, mais ils ne peuvent pas utiliser notre système pour le faire.</p>
                },
                {
                    title: '10.3 Absence de suivi.',
                    detail: "Nous ne participons pas actuellement aux cadres « Absence de suivi » qui nous permettraient de répondre aux signaux ou à d'autres mécanismes de votre part concernant la collecte de vos données personnelles."
                },
            ]
        },
        {
            question: '11. Exclusions.',
            det: "",
            details: [
                {
                    title: '11.1 Données personnelles fournies à autrui.',
                    detail: "La présente Politique de confidentialité ne s'applique pas à toutes les données personnelles que vous fournissez à un autre utilisateur ou visiteur à travers les services ou par tout autre moyen, y compris aux organisateurs sur les pages de l'événement ou les informations postées par vous sur des espaces publics de notre application."
                },
                {
                    title: '11.2 Liens tiers.',
                    detail: "La présente Politique de confidentialité s'applique uniquement aux services. Les Services peuvent contenir des liens vers d'autres sites non exploités ou contrôlés par nous (les « Sites tiers »). Les politiques et procédures que nous avons décrites ici ne s'appliquent pas aux Sites tiers. Les liens contenus sur nos services n’impliquent d’aucune manière notre appui à des Sites tiers ni notre examen de ceux-ci. Nous vous suggérons de contacter ces sites directement pour plus d'informations sur leurs politiques de confidentialité. "
                },
            ]
        },
        {
            question: "12. Enfants - « Children's Online Privacy Protection Act »",
            det: "Nous ne recueillons pas sciemment de Données personnelles auprès d'enfants âgés de moins de treize (13) ans. Si vous êtes âgé de moins de treize (13) ans, veuillez ne pas soumettre des Données personnelles par le biais des services. Nous encourageons les parents et les tuteurs légaux à surveiller l'utilisation d'internet de leurs enfants et à veiller à l'application de notre Politique de confidentialité en demandant à leurs enfants de ne jamais fournir de données personnelles par le biais des services sans leur permission. Si vous avez des raisons de croire qu'un enfant de moins de 13 ans nous a fourni des données personnelles à travers les services, veuillez nous contacter, et nous mettrons tout en œuvre pour supprimer ces informations de nos bases de données.",
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '13. Lois internationales sur la protection de la vie privée.',
            det: "Si vous visitez les services en dehors des États-Unis, sachez que vous envoyez des informations (y compris des Données personnelles) vers le États-Unis  où se trouvent nos serveurs. Ces informations peuvent ensuite être transférées à l’intérieur des États-Unis ou de nouveau hors des États-Unis vers d’autres pays situés à l’extérieur de votre pays de résidence en fonction du type d’informations et de la façon dont nous les stockons. Ces pays (dont les États-Unis) n’ont pas nécessairement de lois sur la protection des données aussi complètes et offrant autant de protection que celles de votre pays de résidence ; toutefois, la collecte, le stockage et l’utilisation que nous faisons de vos renseignements personnels continueront, en tout temps, d’être régis par la présente politique de confidentialité. ",
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '14. Modifications apportées à la présente Politique de confidentialité.',
            det: <p>Les services et nos activités peuvent changer de temps en temps. En conséquence, il peut parfois s'avérer nécessaire pour nous d'apporter des modifications à la présente Politique de confidentialité. Nous nous réservons le droit, à notre seule discrétion, de mettre à jour ou de modifier la présente Politique de confidentialité à tout moment (collectivement, les « Modifications »). Les Modifications apportées à la présente Politique de confidentialité seront affichées sur le Site avec un changement de la date de la « Mise à jour » en haut de la présente Politique de confidentialité. Dans certaines circonstances, AFT GROUP SARL/Espace Show+ peut, mais n’est pas dans l’obligation de vous fournir un avis supplémentaire de ces modifications, par e-mail ou avec les notifications intégrées aux services. Une Modification prendra effet immédiatement suivant la date de la « Mise à jour » ou à toute autre date communiquée par tout autre avis vous étant envoyé. Veuillez consulter la présente Politique régulièrement, et surtout avant de fournir des données personnelles. La présente Politique de confidentialité a été mise à jour à la date indiquée ci-dessus. Votre utilisation continue des services suite à l’entrée en vigueur de toute modification apportée à la présente Politique de confidentialité constitue l'acceptation de ces modifications. Si toute modification apportée à la présente politique de confidentialité n'est pas acceptable pour vous, vous devez cesser l'accès à, la navigation et l’utilisation des services.</p>,
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '15. Résolution des litiges.',
            det: <p>Si vous avez une réclamation à propos des pratiques de confidentialité de Espace Show+, vous devez nous écrire à l'adresse suivante : <a className="text-[blue] " href="mailto:contact@espaceshow-plus.com">contact@espaceshow-plus.com</a> <br /><br /> Nous mettrons en œuvre tous les efforts raisonnables pour tenter de résoudre votre réclamation.</p>,
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '16. RGPD',
            det: <p>Le Règlement général sur la protection des données (RGPD) exige que Espace Show+  fournisse aux utilisateurs plus d'informations sur le traitement de leurs données personnelles. Voilà ce que vous devez savoir : Motifs d'ordre juridique relatifs au traitement de vos données personnelles. Le RGPD exige que nous vous informions des motifs d'ordre juridique sur lesquels nous nous fondons pour traiter les données personnelles vous concernant. Les motifs d'ordre juridique de notre traitement de vos données personnelles aux fins énoncées dans la Section 4 ci-dessus seront généralement les suivants : <br /><br />- Vous avez donné votre consentement <br /><br />- Il est nécessaire pour notre relation contractuelle; <br /><br />- Le traitement est nécessaire pour nous permettre de respecter nos obligations légales ou réglementaires ; et/ou <br /><br />- Le traitement est dans notre intérêt légitime en tant que plateforme de gestion d'événements et de billets électroniques (par exemple, pour protéger la sécurité et l'intégrité de nos systèmes et pour vous apporter un service client, etc.). <br /><br />- Transfert des données personnelles. <br /><br />- Étant donné que ADEFORITI FLACANDJI TECH GROUP est une société mondiale, nous pouvons avoir besoin de transférer vos Données personnelles en dehors du pays où elles ont été fournies à l'origine. Cela peut être à l'intérieur du groupe ou vers des tierces parties avec lesquelles nous travaillons, qui peuvent être situées dans des pays en dehors de l'Afrique, le Bénin et les États-Unis, qui n'ont pas de lois sur la protection des données ou qui ont des lois qui ont des lois moins strictes que les lois existant en Afrique ou aux États-Unis. Lorsque nous transférons des Données personnelles en dehors de l'Afrique, du Bénin et des États-Unis, nous prenons les mesures exigées par la loi afin de nous assurer que des protections appropriées sont en place pour la protection de vos données personnelles.  <br /><br />- Conservation des Données personnelles. <br /> Nous conservons vos Données personnelles aussi longtemps que nécessaire pour vous apporter nos Services, ou à d'autres fins importantes comme le respect des obligations légales, la résolution de conflits et l'application de nos accords. Si vous avez un compte avec nous, nous conserverons généralement vos données personnelles pendant une période de quatre-vingt dix (90) jours après que vous avez demandé la fermeture de votre compte ou s'il est resté inactif pendant sept (05) ans. <br /><br />- Vos droits. <br />La législation sur la protection des données vous donne des droits concernant les données personnelles que nous détenons à votre sujet, y compris le droit de demander une copie des données personnelles, de nous demander de rectifier, restreindre ou supprimer vos données personnelles, de vous opposer à un profilage et de vous désabonner des communications marketing. En grande partie, vous pouvez exercer ces droits en vous connectant et en vous rendant sur la page Mon compte ou en modifiant les « paramètres des cookies » dans votre navigateur (voir notre Déclaration sur les cookies pour plus d’informations). Si vous n'arrivez pas à trouver ce que vous cherchez sur la page "Paramètres du compte", veuillez prendre contact avec nous à l'aide des informations de contact indiquées dans la Section 15 ci-dessus. Veuillez noter que nous effectuerons une évaluation au cas par cas des demandes d'exercice des droits de protection des données. Dans certaines circonstances, nous ne sommes pas tenus légalement de nous conformer à votre demande en raison de lois existant dans votre pays ou à cause d'exemptions prévues dans la législation sur la protection des données. Si vous avez une plainte concernant la façon dont nous gérons vos données personnelles, veuillez prendre contact avec nous de la manière indiquée dans la Section 15 pour expliquer votre cas. Si la façon dont nous avons essayé de résoudre votre plainte ne vous satisfait pas, vous pourrez contacter l'autorité de protection des données compétente. <br /><br /> AFT GROUP SARL/Espace Show+ en tant que contrôleur des données et sous-traitant des données. <br /> <br />La législation sur la protection des données fait une distinction entre les organisations qui traitent les Données personnelles à leurs propres fins (connues en tant que « contrôleurs des données ») et les organisations qui traitent les données personnelles pour le compte d'autres organisations (connues en tant que « sous-traitants des données »). Si vous avez une question ou une plainte sur la manière dont vos données personnelles sont gérées, celles-ci doivent toujours être adressées au contrôleur des données concerné, car c'est lui qui est principalement responsable de vos données personnelles. <br /><br />AFT GROUP SARL/Espace Show+  peut agir soit en tant que contrôleur des données, soit en tant que sous-traitant des données en ce qui concerne vos données personnelles, en fonction des circonstances. Par exemple, si vous créez un compte auprès de nous pour organiser vos événements, AFT GROUP SARL sera le contrôleur des données vis-à-vis des données personnelles que vous fournissez dans le cadre de votre compte. Nous serons aussi le contrôleur des données personnelles que nous avons obtenues sur l'utilisation des Applications ou des Propriétés de AFT GROUP SARL, qui peuvent se rapporter aux organisateurs ou aux consommateurs. Nous utilisons cela pour mener des recherches et des analyses afin de mieux comprendre et servir les utilisateurs des services et aussi pour améliorer notre plateforme et vous fournir des recommandations plus ciblées sur les événements qui, selon nous, peuvent vous intéresser. Toutefois, si vous vous inscrivez à un événement en tant que consommateur, nous traiterons vos Données personnelles pour aider à administrer l'événement pour le compte de l'organisateur (par exemple, envoi d'e-mails de confirmation, promotionnels et de retours d'informations, traitement des paiements, etc.) et pour aider l'organisateur à cibler et à comprendre le succès de son événement et sa planification (par exemple, fournir des rapports d'événements, utiliser des analyses pour mieux comprendre l'efficacité des différents canaux de vente, etc.). Dans ces circonstances, AFT GROUP SARL/Espace Show+ fournit simplement les outils pour les organisateurs et n'est pas responsable de l'exactitude continue des données personnelles fournies. Toutes les questions que vous pouvez avoir concernant vos données personnelles et vos droits en vertu de la législation sur la protection des données doivent par conséquent être adressées à l'organisateur en tant que contrôleur des données, et non à AFT GROUP SARL/Espace Show+.</p>,
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        },
        {
            question: '17. Loi Applicable',
            det: <p>- Les présentes Conditions Générales d'Utilisation et Politique de Confidentialité sont régis par les lois en vigueur au Bénin . <br />Tout litige découlant de ces conditions sera soumis à la compétence exclusive des tribunaux de Cotonou <br /> <br />En utilisant notre application, vous reconnaissez avoir lu, compris et accepté les termes de nos Conditions Générales d'Utilisation et notre Politique de Confidentialité. Si vous avez des questions ou des préoccupations, veuillez nous contacter via le chat de l'application ou
                par mail : <a className="text-[blue] " href="mailto:support@espaceshow-plus.com">support@espaceshow-plus.com</a> ou <a className="text-[blue] " href="mailto:contact@espaceshow-plus.com">contact@espaceshow-plus.com</a></p>,
            details: [
                {
                    title: '',
                    detail: ''
                }
            ]
        }
    ]


    return (
        <>
            <Navbar />
            <section className="p-5 pt-[60px]" style={{ minHeight: '80vh' }}>
                <p className="text-xl text-center pb-5 mt-10 font-bold text-[27px] ">Politiques de confidentialités de Espace Show+</p>
                <div style={{ margin: 'auto' }} className="w-full md:w-[65%]">
                    <div className="">
                        <div>
                            {politiques.map((item, idx) => (
                                <div key={idx}>
                                    <div className="items-center pt-4 text-justify ">
                                        <p className="w-[100%] md:text-[19px] font-bold mr-10 pb-2 ">{item.question}</p>
                                        <div >{item.det}</div>
                                        {item.details.map((det, index) => (
                                            <div className="mt-4" key={index}>
                                                <p className="w-[100%] md:text-[17px] font-bold mr-10 pb-2 ">{det.title}</p>
                                                <div className="text-[15px]">{det.detail}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-7 text-sm font-bold ">
                                <p>Dernière mise à jour: {updatedAt}</p>
                                <p>Espace Show+ by AFT GROUP SARL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}
