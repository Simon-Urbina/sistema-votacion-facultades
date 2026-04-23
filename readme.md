# Estructura del proyecto

<Intro  Crear los directorios del proyecto

1. mkdir sistema-votacion-capas
2. cd sistema-votacion-capas
3. mkdir backend 
4. mkdir frontend

<Backend_________________________________________________________________

cd backend
npm init -y
npm install express cors dotenv @supabase/supabase-js
npm install nodemon -D

1.) crear la estructura del Backend y copiar el contenido capertas/archivos 

backend/
├── src/
│   ├── config/
│   │   └── supabase.js
│   ├── controllers/
│   │   ├── sedeController.js
│   │   ├── facultadController.js
│   │   ├── candidatoController.js
│   │   └── votoController.js
│   ├── services/
│   │   ├── sedeService.js
│   │   ├── facultadService.js
│   │   ├── candidatoService.js
│   │   └── votoService.js
│   ├── repositories/
│   │   ├── sedeRepository.js
│   │   ├── facultadRepository.js
│   │   ├── candidatoRepository.js
│   │   └── votoRepository.js
│   ├── routes/
│   │   ├── sedeRoutes.js
│   │   ├── facultadRoutes.js
│   │   ├── candidatoRoutes.js
│   │   └── votoRoutes.js
│   └── app.js
├── .env
└── package.json


2.) Crear la base datos en Supabase

- base de datos (project):
db_sistema_votacion
- contraseña
db_sistema_votacion_usta

2.1.) llevar la información al archivo .env del Backend
PORT=3001
SUPABASE_URL=URL_DE_SUPABASE
SUPABASE_SERVICE_ROLE_KEY=SERVICE_ROLE_KEY

> ruta:
- SUPABASE_URL:
project settings/ Data API/ API URL (Copy)
- SUPABASE_SERVICE_ROLE_KEY
project settings/ API keys/ Legacy anon, service_role API keys/ service_role secret/ Reveal/ copy


3.) Ejecutar el Script en la base de datos (SQL editor)

create table sedes (
  id bigint generated always as identity primary key,
  nombre text not null unique
);

create table facultades (
  id bigint generated always as identity primary key,
  nombre text not null,
  sede_id bigint not null references sedes(id) on delete cascade
);

create table candidatos (
  id bigint generated always as identity primary key,
  nombre text not null,
  propuesta text,
  foto_url text,
  facultad_id bigint not null references facultades(id) on delete cascade
);

create table votaciones (
  id bigint generated always as identity primary key,
  votante_identificacion text not null,
  sede_id bigint not null references sedes(id),
  facultad_id bigint not null references facultades(id),
  candidato_id bigint not null references candidatos(id),
  created_at timestamptz default now()
);

create unique index unique_voto_por_usuario
on votaciones (votante_identificacion);


4.) insertar datos de prueba:
insert into sedes (nombre) values
('Tunja'),
('Bogotá'),
('Villavicencio');

insert into facultades (nombre, sede_id) values
('Ingeniería de Sistemas', 1),
('Ingeniería Civil', 1),
('Derecho', 2),
('Administración', 3);

insert into candidatos (nombre, propuesta, foto_url, facultad_id) values
('Laura Martínez', 'Impulsar talleres prácticos de frontend y backend', 'https://i.pravatar.cc/150?img=1', 1),
('Carlos Pérez', 'Organizar mentorías y sesiones de apoyo entre compañeros', 'https://i.pravatar.cc/150?img=2', 1),
('Ana Gómez', 'Fortalecer actividades académicas y representación estudiantil', 'https://i.pravatar.cc/150?img=3', 2),
('Juan Rojas', 'Promover jornadas de bienestar y participación estudiantil', 'https://i.pravatar.cc/150?img=4', 3),
('María Torres', 'Mejorar la comunicación entre estudiantes y directivas', 'https://i.pravatar.cc/150?img=5', 4);


5.) Probar el backend
cd backend
npm run dev

6.) Probar estas rutas en el navegador o Postman

http://localhost:3001/api/sedes
http://localhost:3001/api/facultades/sede/1
http://localhost:3001/api/candidatos/facultad/1


<Frontend_________________________________________________________________

1.) en una nueva terminal acceder al directorio del FE y realizar las instalaciones npm

cd ../frontend (SOLO si la terminal está en otra ruta)
- cd frontend
- npm create vite@latest . -- --template react
- npm install
- npm install axios

2.) Estructura del frontend, vamos a dejar la estructura así:

src/
├── api/
│   ├── axiosClient.js
│   ├── sedeApi.js
│   ├── facultadApi.js
│   ├── candidatoApi.js
│   └── votoApi.js
├── components/
│   ├── SedeSelect.jsx
│   ├── FacultadSelect.jsx
│   ├── CandidateCard.jsx
│   └── VoteForm.jsx
├── pages/
│   └── VotingPage.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx

3.) Probar el Frontend
cd frontend
npm run dev
