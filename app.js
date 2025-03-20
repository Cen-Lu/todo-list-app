document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const task = input.value.trim();
        if (!task) return;

        try {
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            });

            if (!response.ok) throw new Error('Failed to add task');

            const data = await response.json();
            addTaskToList(task);
            input.value = '';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add task. Please try again.');
        }
    });

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = task;
        list.appendChild(li);
    }
});