function randomGift() {
    var gifts = ['CPU Core i9', 'MSI 13500', 'LAPTOP ASUS GAMING'];

    var gift = document.getElementById('gift_name');

    var random = Math.floor(Math.random() * gifts.length);

    gift.innerHTML = gifts[random]
}