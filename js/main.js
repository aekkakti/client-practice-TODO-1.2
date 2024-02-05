Vue.component('column1', {
    template: `
    <div class="column">
        <h2 class="t-a-c">Принято в работу</h2>
        <button @click="removeFromLocalStorage" class="clearTODO">Удалить все карточки</button><br><br>
        <input v-model="name" type="text" class="addCardInput"><br><br>
        <button @click="addCard(name)" class="addCardButton">Добавить карточку</button>
        <ul>
            <li v-for="(card, index) in cards">
                <p>{{ card.name }}</p>
                <list :tasks="card.tasks" @add-task="addTask(index, $event)" @complete-task="completeTask(index, $event)"></list>
            </li>
        </ul>
    </div>
    `,
    methods: {
        addCard() {
            if (this.countCards < 3 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.countCards += 1
                this.saveToLocalStorage();
            }
            else if (this.name === '') {
                alert('Нельзя создавать пустую карточку!')
            }
            else {
                alert('Максимум можно добавить только 3 карточки!')
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask);
            this.saveToLocalStorage();
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completeStyle = !this.cards[cardIndex].tasks[taskIndex].completeStyle
            this.saveToLocalStorage();
        },

        loadFromLocalStorage() {
            let savedData = localStorage.getItem('todo');
            if (savedData) {
                this.cards = JSON.parse(savedData)
                }
            },
        saveToLocalStorage() {
            let jsonData = JSON.stringify(this.cards);
            localStorage.setItem('todo', jsonData)
            },
        removeFromLocalStorage(){
            localStorage.clear()
            location.reload();
        }
        },
        mounted() {
            this.loadFromLocalStorage();
        },
    data() {
        return {
            name: '',
            cards: [],
            countCards: 0,
        }
    }
})

Vue.component('column2', {
    template: `
    <div class="column">
        <h2 class="t-a-c">В моменте</h2>
    </div>
    `,
    methods: {
        addCard() {
            if (this.countCards < 5 && this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.countCards += 1
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
    },
    data() {
        return {
            name: '',
            cards: [],
            countCards: 0
        }
    }
})

Vue.component('column3', {
    template: `
    <div class="column">
        <h2 class="t-a-c">Выполнено</h2>
    </div>
    `,
    methods: {
        addCard() {
            if (this.name !== '') {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.countCards += 1
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
    },
    data() {
        return {
            name: '',
            cards: [],
            countCards: 0
        }
    }
})

Vue.component('list', {
    props: ['tasks'],
    template: `
    <ul>
        <li v-for="(task, index) in tasks" :key="index">
            <p :class="{'completeStyle' : task.completeStyle}" @click="completeTask(index)">{{task.name}}</p>
        </li>
        <input v-model="newTask" type="text">
        <button @click="addTask">Добавить задачу</button>
    </ul>
    `,
    data() {
        return {
            newTask: '',
            countTask: 0
        }
    },
    methods: {
        addTask() {
            if (this.newTask !== '' && this.countTask < 3){
                this.$emit('add-task', {name: this.newTask, completeStyle: false})
                this.newTask = ''
                this.countTask += 1
            }
            else if (this.newTask !== '' && this.countTask < 5) {
                this.$emit('add-task', {name: this.newTask, completeStyle: false})
                this.newTask = ''
                this.countTask += 1
            }
            else if (this.newTask === '') {
                alert('Нельзя создавать пустую задачу!')
            }
            else {
                alert('Максимум можно добавить только 5 задач!')
            }
        },
        completeTask(index) {
            this.$emit('complete-task', index)
        }
    }
})

let app = new Vue({
    el: "#todo",
})
