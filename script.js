// Клас "Абонент"
class Subscriber {
    constructor(phoneNumber, address, owner, totalCallDuration, accountBalance) {
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.owner = owner;
        this.totalCallDuration = totalCallDuration;
        this.accountBalance = accountBalance;
    }

    displayInfo() {
        return `
            <h2>Абонент</h2>
            <p>Номер телефону: ${this.phoneNumber}</p>
            <p>Домашня адреса: ${this.address}</p>
            <p>Власник: ${this.owner}</p>
            <p>Сумарна тривалість розмов: ${this.totalCallDuration} хвилин</p>
            <p>Рахунок: ${this.accountBalance} грн</p>
        `;
    }
}



// Клас для колекції об'єктів "Абонент"
class SubscriberCollection {
    constructor() {
        this.subscribers = [];
    }

    addSubscriber(subscriber) {
        this.subscribers.push(subscriber);
    }

    addSubscribers(subscribers) {
        this.subscribers = this.subscribers.concat(subscribers);
    }

    getSubscriberByPhone(phoneNumber) {
        return this.subscribers.find(subscriber => subscriber.phoneNumber === phoneNumber);
    }

    getSubscribersByAddressAndCallDuration(address, minCallDuration) {
        return this.subscribers.filter(subscriber => 
            subscriber.address === address && subscriber.totalCallDuration > minCallDuration
        );
    }

    updateSubscriber(phoneNumber, updatedData) {
        let subscriber = this.getSubscriberByPhone(phoneNumber);
        if (subscriber) {
            Object.assign(subscriber, updatedData);
        }
    }

    deleteSubscriber(phoneNumber) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber.phoneNumber !== phoneNumber);
    }
}




// Ініціалізація колекції абонентів
const subscriberCollection = new SubscriberCollection();



// Функція для виведення інформації про абонента
function displaySubscriberInfo(subscriber, elementId) {
    const element = document.getElementById(elementId);
    if (subscriber) {
        element.innerHTML = subscriber.displayInfo();
    } else {
        element.innerHTML = "<p>Абонент не знайдений</p>";
    }
}



// Додавання одного абонента через форму
document.getElementById('add-subscriber-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address').value;
    const owner = document.getElementById('owner').value;
    const totalCallDuration = parseFloat(document.getElementById('totalCallDuration').value);
    const accountBalance = parseFloat(document.getElementById('accountBalance').value);

    const newSubscriber = new Subscriber(phoneNumber, address, owner, totalCallDuration, accountBalance);
    subscriberCollection.addSubscriber(newSubscriber);
    alert('Абонент доданий');
});




// Пошук абонента за номером телефону
document.getElementById('searchButton').addEventListener('click', function() {
    const phoneNumber = document.getElementById('searchPhoneNumber').value;
    const subscriber = subscriberCollection.getSubscriberByPhone(phoneNumber);
    displaySubscriberInfo(subscriber, 'search-result');
});




// Отримання вибірки абонентів за адресою та тривалістю розмов
document.getElementById('filterButton').addEventListener('click', function() {
    const address = document.getElementById('filterAddress').value;
    const minCallDuration = parseFloat(document.getElementById('minCallDuration').value);
    const filteredSubscribers = subscriberCollection.getSubscribersByAddressAndCallDuration(address, minCallDuration);

    const filteredResults = document.getElementById('filtered-results');
    filteredResults.innerHTML = '';
    filteredSubscribers.forEach(subscriber => {
        filteredResults.innerHTML += subscriber.displayInfo();
    });
});



// Редагування інформації про абонента
document.getElementById('update-subscriber-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const phoneNumber = document.getElementById('updatePhoneNumber').value;
    const updatedData = {
        address: document.getElementById('updateAddress').value,
        owner: document.getElementById('updateOwner').value,
        totalCallDuration: parseFloat(document.getElementById('updateCallDuration').value),
        accountBalance: parseFloat(document.getElementById('updateBalance').value)
    };

    subscriberCollection.updateSubscriber(phoneNumber, updatedData);
    alert('Інформацію про абонента оновлено');
});



// Видалення абонента за номером телефону
document.getElementById('deleteButton').addEventListener('click', function() {
    const phoneNumber = document.getElementById('deletePhoneNumber').value;
    subscriberCollection.deleteSubscriber(phoneNumber);
    alert('Абонент видалений');
});
