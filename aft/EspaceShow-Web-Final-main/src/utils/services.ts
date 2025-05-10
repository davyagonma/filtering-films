export const checkIfUserIsAdmin = () => {
    if (typeof sessionStorage !== 'undefined') {
        const role = sessionStorage.getItem('role');
        return role === 'utilisateur';
    }
    return false;
}

export const generateRandomCode = (): string => {
    const codeLength = 6;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

export const getAllTickets = () => {
    const tickets = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ticket_')) {
            const ticket = JSON.parse(localStorage.getItem(key) || '');
            tickets.push(ticket);
        }
    }
    return tickets;
}

export const clearAllTickets = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ticket_')) {
            localStorage.removeItem(key)
        }
    }
}


export const sendNotification = (title: string, message: string) => {
    if (!("Notification" in window)) {
        alert("Ce navigateur ne supporte pas les notifications.");
    } else if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: "/favicon.ico",
        });
    } else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification(title, {
                    body: message,
                    icon: "/favicon.ico",
                });
            }
        });
    }
}


export const setIsScanned = async (id: string) => {
    const response = await fetch(`/api/mon-ticket`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId: id })
    });
    if (!response.ok) {
        console.log(response);
    }
    const data = await response.json();
    // console.log(data)
}


export const getStatus = async (id: string) => {
    const response = await fetch(`/api/mon-ticket`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        }
    );
    if (!response.ok) {
        console.log(response);
        return null;
    }
    const data = await response.json();
    return data
}