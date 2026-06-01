const logoutButton = new LogoutButton();

logoutButton.action = function () {
    ApiConnector.logout(function callback(logoutResult) {
        if (logoutResult.success) {
            location.reload();
        }
    });
};

ApiConnector.current(function callback(result) {
    if (result.success) {
        ProfileWidget.showProfile(result.data);
    }
});

const ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks(function callback(ratesResult) {
        if (ratesResult.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(ratesResult.data);
        }
    });
};

getRates();
const ratesTimer = setInterval(getRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, function callback(moneyResult) {
        if (moneyResult.success) {
            ProfileWidget.showProfile(moneyResult.data);
            moneyManager.setMessage(moneyResult.success, 'Пополнение счета прошло успешно');
        } else moneyManager.setMessage(!moneyResult.success, moneyResult.error);
    })
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, function callback(convertResult) {
        if (convertResult.success) {
            ProfileWidget.showProfile(convertResult.data);
            moneyManager.setMessage(convertResult.success, 'Конвертация валюты прошла успешно');
        } else moneyManager.setMessage(!convertResult.success, convertResult.error);
    });
};

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, function callback(transferResult) {
        if (transferResult.success) {
            ProfileWidget.showProfile(transferResult.data);
            moneyManager.setMessage(transferResult.success, 'Перевод средств прошел успешно');
        } else moneyManager.setMessage(!transferResult.success, transferResult.error);
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(function callback(result) {
    if (result.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        favoritesWidget.updateUsersList(result.data);
    }
});

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, function callback(addUserResult) {
        if (addUserResult.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(addUserResult.data);
            favoritesWidget.setMessage(addUserResult.success, 'Пользователь добавлен в список избранного');
        } else favoritesWidget.setMessage(!addUserResult.success, addUserResult.error);
    });
};

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, function callback(removeUser) {
        if (removeUser.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(removeUser.data);
            favoritesWidget.setMessage(removeUser.success, 'Пользователь удалён из списка избранного');
        } else favoritesWidget.setMessage(!removeUser.success, removeUser.error);
    });
};