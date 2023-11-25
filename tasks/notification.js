// notification.js
const { tasks } = require('./tasksData.js');
const notifier = require('node-notifier');

const notificationTask = tasks;

function showNotification(task) {
    notifier.notify({
        title: `Tarea: ${task.title}`,
        message: `Descripción: ${task.description}\nFecha: ${task.date}`,
        sound: true,
        wait: false,
        timeout: 60,
        closeLabel: 'Cerrar',
        actions: ['Acción 1', 'Acción 2'],
        dropdownLabel: 'Más acciones',
    });
};

const now = new Date();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();
const actualDate = `${currentHour}:${currentMinute}`;

function notification() {

    notificationTask.forEach((task) => {
        if (actualDate === task.date) {
            showNotification(task);
        };
    });

};

module.exports = { notification };