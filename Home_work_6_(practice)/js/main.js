let kolName = document.getElementById("name")
let kolDamage = document.getElementById("damage")
let kolArmor = document.getElementById("armor")
let kolMoney = document.getElementById("money")
let kolLive = document.getElementById("live")

let animalName = document.getElementById("animal-name")
let animalDamage = document.getElementById("animal-damage")
let animalArmor = document.getElementById("animal-armor")
let animalCost = document.getElementById("animal-cost")
let animalLive = document.getElementById("animal-live")

let dedName = document.getElementById("ded-name")
let dedDamage = document.getElementById("ded-damage")
let dedArmor = document.getElementById("ded-armor")
let dedCost = document.getElementById("ded-cost")
let dedLive = document.getElementById("ded-live")

let buttonBlock = document.getElementById("button-block")

let hit = document.getElementById("hit");
let close = document.getElementById("close");

let right = document.getElementById("right");
let top1 = document.getElementById("top");
let left = document.getElementById("left");

let imgKolobok = document.getElementById("img-kolobok");
let imgHare = document.getElementById("img-hare");
let imgWolf = document.getElementById("img-wolf");
let imgDed = document.getElementById("img-ded");

let oneAnimal;

let arrItems = ["Удача", "Палка", "Проклятье", "Мораль", "Ярость"];

let hare = {
   name: "Заяц",
   color: "Gray",
   damage: 10,
   armor: 1,
   live: 100,
   money: 2,
   mod: "animal"

}
let wolf = {
   name: "Волк",
   color: "Gray",
   damage: 15,
   armor: 3,
   live: 120,
   money: 5,
   mod: "animal"

}

let animal = [wolf, hare]

let ded = {
   name: "Дед",
   damage: 80,
   armor: 8,
   live: 1400,
   money: 20,
   mod: "ded"
}

let kolobok = {
   name: "kolobok",
   color: "yellow",
   damage: 11,
   armor: 2,
   live: 100,
   money: 10,
   mod: "kolobok"
}
updateInfo(kolobok);

// Получение случайного item и его значения
function getRandomItem() {
   let randomPercent = randomInteger(0, 100);

   if (randomPercent >= 0 && randomPercent < 25) {
      let item = new Object;
      item.damage = 0;
      item.armor = 0;
      item.live = 0;
      item.money = 0;
      item.name = arrItems[randomInteger(0, arrItems.length - 1)];
      let createStat = randomInteger(0, 100)
      if (createStat >= 0 && createStat < 25) {
         item.damage = randomInteger(-10, 10);
      } else if (createStat >= 25 && createStat < 50) {
         item.armor = randomInteger(-10, 10);
      } else if (createStat >= 50 && createStat < 75) {
         item.live = randomInteger(-10, 10);
      } else if (createStat >= 75 && createStat < 100) {
         item.money = randomInteger(-10, 10);
      }
      return item
   }
}

// Кнопка "Закрыть"
close.onclick = function () {
   kolobok.live = kolobok.live - (oneAnimal.damage * kolobok.armor);
   alert(`Kolobok сбежал! Вы потеряли ${oneAnimal.damage * kolobok.armor}`)
   updateInfo(kolobok);
   checkAlive(kolobok.live);
   buttonBlock.classList.remove("show");
   buttonBlock.classList.add("hide");
}

// Изменение статистики при битве с animal
function damgeDiller(animl, kol) {
   if (kol.damage > animl.damage) {
      animl.live = animl.live - (kol.damage / animl.armor);


      if (checkLiveAnim(animl, kol)) {
         updateInfo(kol);
         return checkLiveAnim(animl, kol)
      }
      updateInfo(kol);
      updateInfo(animl);

   } else {
      kol.live = kol.live - (animl.damage / kol.armor);

      if (!checkLiveAnim(animl, kol)) {
         updateInfo(kol);
         return checkLiveAnim(animl, kol)
      }
      updateInfo(kol);
      updateInfo(animl);
   }
}

// Изменение статистики при битве с ded
function damgeDillerMain(dedBattle, kol) {
   if (kol.damage > dedBattle.damage) {
      dedBattle.live = dedBattle.live - (kol.damage / dedBattle.armor);

      if (checkLiveDed(dedBattle, kol)) {
         updateInfo(kol);
         return checkLiveDed(dedBattle, kol)
      }
      updateInfo(kol);
      updateInfo(dedBattle);

   } else {
      kol.live = kol.live - (dedBattle.damage / kol.armor);

      if (!checkLiveDed(dedBattle, kol)) {
         updateInfo(kol);
         return checkLiveDed(dedBattle, kol)
      }
      updateInfo(kol);
      updateInfo(dedBattle);
   }
}

// Проверка "кто победил"
function checkLiveAnim(anim, kol) {

   if (kol.live <= 0) {
      checkAlive(kol.live);
      return false
   }
   if (anim.live <= 0 && anim.name == hare.name) {
      kol.money += anim.money
      updateInfo(kol);
      alert(`вы победили ${anim.name}`)
      imgHare.classList.add("img-disappear");
      return true
   } else if (anim.live <= 0 && anim.name == wolf.name) {
      kol.money += anim.money
      updateInfo(kol);
      alert(`вы победили ${anim.name}`)
      imgWolf.classList.add("img-disappear");
      return true
   }
}

function checkLiveDed(ded, kol) {

   if (kol.live <= 0) {
      checkAlive(kol.live);
      return false
   }
   if (ded.live <= 0) {
      kol.money += ded.money
      updateInfo(kol);
      alert(`Поздравляем! Вы победили ${ded.name}`)
      imgDed.classList.add("img-disappear");
      return true
   }
}

// Кнопка "В лес"
right.onclick = function () {
   imgDed.classList.add("hide");
   imgHare.classList.remove("img-disappear");
   imgWolf.classList.remove("img-disappear");
   oneAnimal = animal[randomInteger(0, animal.length - 1)]
   buttonBlock.classList.remove("hide");
   buttonBlock.classList.add("show");
   updateInfo(oneAnimal);

   hit.onclick = function () {
      damgeDiller(oneAnimal, kolobok);
   }

   let newItem = getRandomItem();

   if (oneAnimal.name == hare.name) {
      imgHare.classList.remove("hide");
   } else if (oneAnimal.name !== hare.name) {
      imgHare.classList.add("hide");
   }

   if (oneAnimal.name == wolf.name) {
      imgWolf.classList.remove("hide");
   } else if (oneAnimal.name !== wolf.name) {
      imgWolf.classList.add("hide");
   }

   if (newItem) {

      if (randomInteger(0, 1)) {
         kolobok.damage += newItem.damage;
         kolobok.live += newItem.live;
         kolobok.armor += newItem.armor;
         kolobok.money += newItem.money;
         getNameElem(kolobok.name)
         updateInfo(kolobok);
      } else {
         oneAnimal.damage += newItem.damage;
         oneAnimal.live += newItem.live;
         oneAnimal.armor += newItem.armor;
         oneAnimal.money += newItem.money;
         getNameElem(oneAnimal.name)
         updateInfo(oneAnimal);
      }
   }

   function getNameElem(name) {
      for (elem in newItem) {
         if (newItem[elem] > 0) {
            console.log(newItem)
            alert(`${name} нашел ${newItem.name} его ${elem} изменилось на ${newItem[elem]}`);
         }
      }
   }
}

// Кнопка "Налево"
left.onclick = function () {
   imgHare.classList.add("hide");
   imgWolf.classList.add("hide");
   imgDed.classList.remove("hide");
   buttonBlock.classList.remove("hide");
   buttonBlock.classList.add("show");
   updateInfo(ded);

   hit.onclick = function () {
      damgeDillerMain(ded, kolobok);
   }

   if (newItem) {

      if (randomInteger(0, 1)) {
         kolobok.damage += newItem.damage;
         kolobok.live += newItem.live;
         kolobok.armor += newItem.armor;
         kolobok.money += newItem.money;
         getNameElem(kolobok.name)
         updateInfo(kolobok);
      } else {
         ded.damage += newItem.damage;
         ded.live += newItem.live;
         ded.armor += newItem.armor;
         ded.money += newItem.money;
         getNameElem(ded.name)
         updateInfo(ded);
      }
   }
}

// Кнопка "Магазин"
top1.onclick = function () {
   imgDed.classList.add("hide");
   imgHare.classList.add("hide");
   imgWolf.classList.add("hide");
   buttonBlock.classList.add("hide");
   buttonBlock.classList.remove("show");
   let getItem = prompt(`Магазин: Жизнь - 10 --> Стоимость 10 (ввести - live) ${'\n'} Броня - 2 --> Стоимость 15 (ввести - armor) ${'\n'} Атака (Урон) - 10 --> Стоимость 20 (ввести - damage)`);
   let items = {
      live: {
         cost: 10,
         count: 10,
         name: "live"
      },
      armor: {
         cost: 15,
         count: 2,
         name: "armor"
      },
      damage: {
         cost: 20,
         count: 10,
         name: "damage"
      }
   }

   if (getItem in items) {
      let element = items[getItem];
      console.log(element)
      if (kolobok.money >= element.cost) {
         switch (element.name) {
            case "damage":
               kolobok.damage += element.count
               kolobok.money -= element.cost

               break;
            case "live":

               kolobok.live += element.count
               kolobok.money -= element.cost

               break;
            case "armor":
               kolobok.armor += element.count
               kolobok.money -= element.cost

               break;
         }
         updateInfo(kolobok);
      } else {
         alert(`у вас не хватает денег на ${element.name}! у вас всего: ${kolobok.money}`);
      }
   }
}

// Получение случайного значения
function randomInteger(min, max) {
   let rand = min + Math.random() * (max - min);
   return Math.round(rand);
}

// Проверка live колобка
function checkAlive(live) {
   if (live <= 0) {
      imgKolobok.classList.add("img-disappear");
      alert('Вы проиграли! Чтобы продолжить, перезагрузите страницу');
      // window.location.reload();
   }
}

// Обновление статистики
function updateInfo(item) {
   if (item.mod === "kolobok") {
      kolName.innerHTML = `Имя: ${item.name}`
      kolDamage.innerHTML = `Урон: ${item.damage}`
      kolArmor.innerHTML = `Броня: ${item.armor}`
      kolMoney.innerHTML = `Деньги: ${item.money}`
      kolLive.innerHTML = `Жизнь: ${item.live}`

   } else if (animalName) {
      animalName.innerHTML = `Имя: ${item.name}`
      animalDamage.innerHTML = `Урон: ${item.damage}`
      animalArmor.innerHTML = `Броня: ${item.armor}`
      animalCost.innerHTML = `Стоимость: ${item.money}`
      animalLive.innerHTML = `Жизнь: ${item.live}`

   }
}