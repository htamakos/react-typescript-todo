import * as React from 'react';

interface IToDo {
    id: number;
    name: string;
    text: string;
};

interface IToDoListItemProps {
    todo: IToDo;
    onDelete: (todo: IToDo) => void;
}

const ToDoListItem: React.FC<IToDoListItemProps> = ({todo, onDelete}) => {
    const onClick = () => {
        onDelete(todo);
    };

    return (
        <li>
            { todo.name } <button onClick={onClick}>Delete</button>
        </li>
    );
};

interface IToDoListProps {
    todos: IToDo[];
    onDelete: (todo: IToDo) => void;
}

const ToDoList: React.FC<IToDoListProps> = ({todos, onDelete}) => {
    return (
        <ul>
            {
                todos.map(todo => {
                    return <ToDoListItem todo={todo} onDelete={onDelete} />;
                })
            }
        </ul>
    );
}

interface INewToDoProps {
    todo: IToDo;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: (e: React.FormEvent<HTMLFormElement>) => void;
}

const NewToDo: React.FC<INewToDoProps> = ({ todo, onChange, onAdd }) => {
    return (
        <form onSubmit={onAdd}>
            <input value={todo.name}
                   onChange={onChange}></input>
            <button type="submit">Add ToDo</button>
        </form>
    );
};

interface AppState {
    newToDo: IToDo;
    todos: IToDo[];
}

export class App extends React.Component<{}, AppState> {
    todos: IToDo[] = [];

    state = {
        newToDo: { id: 1, name: "", text: "" },
        todos: this.todos
    };

    render() {
        return (
            <div>
                <h1>ToDo List</h1>
                <NewToDo todo={this.state.newToDo}
                         onChange={this.handleOnChange}
                         onAdd={this.addTodo}/>
                <ToDoList todos={this.state.todos} onDelete={this.deleteToDo}/>
            </div>
        );
    };

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        this.setState({
            newToDo: {
                ...this.state.newToDo,
                name: inputValue
            }
        });
    }

    private addTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.setState(prevState => ({
            newToDo: {
                id: prevState.newToDo.id + 1,
                name: "",
                text: ""
            },
            todos: [
                ...prevState.todos,
                prevState.newToDo
            ]
        }));
    }

    private deleteToDo = (dTodo: IToDo): void => {
        this.setState(prevState => ({
            todos: [
                ...prevState.todos.filter(todo => todo.id !== dTodo.id)
            ]
        }));
    }
}

