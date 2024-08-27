import React from 'react';

const TodoList = ({todos}) => {
    return (
        <div className="grid grid-cols-12 gap-8">
            {todos?.map((todo) => {
                return (
                    <div
                        key={todo._id}
                        className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4 border border-secondary-100p-2 rounded-lg"
                    >
                        <div className={""}>
                            <p>{todo.value}</p>
                            <div>
                                checkbox
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
};

export default TodoList;
