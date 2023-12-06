
# RAVN CHALLENGE

## 1. Install packages
**npm install**


## 2. Start Dev Mode
**npm run dev**

## 3. Project Description

The Ravn Challenge is a web application developed with Next.js that allows users to manage their tasks efficiently. It offers complete CRUD (Create, Read, Update and Delete) functionalities for tracking and organizing tasks.

- Task Creation: Add new tasks with details such as assignment, due date, status and name.

- Task Viewing: Explore all your tasks in an orderly and clear way. Filter and sort based on different criteria for easy reference.

- Task Update: Modify the details of an existing task, such as its status, due date, or assignment.

- Deleting Tasks: Delete tasks that are no longer relevant or completed.

## 4. Screenshots

## 5. Project Structure

    src
        app
            dashboard                   # Dashboard view
                components        
                    CardList            # Task Column
                        CardListHeader  # Task Colunn Header
                        CardTask        # Task Card
                    ModalTask           # Modal Add or Edit Task
                    MonsterInput        # Search Task

            my-task                     # View of My Tasks
            settings                    # Settings View
        shared
            assets                      # Images and Shared Resources
            components                  # Generic and reusable components
            contexts                    # Contexts for sharing data
            hooks                       # Custom hooks
            layouts                     # Layouts, including sidebar design
            routes                      # Route management and sidebar navigation
            services                    # Service logic (GraphQL queries, etc.)
            types                       # Definición de tipos de datos
            utils                       # Funciones de apoyo y utilidades
        styles                          # Styles types and global.css
        ui                              # Reusable UI Components (Buttons, Inputs, DatePicker, Checkbox, Containers)

## 6. Technologies/libraries used

- Next JS
- React JS
- Typescript
- Moment JS
- Apollo Client
- Graphql
- Tailwind
- Headlessui
- React Hook Forms
- Yup
- Remixicon


