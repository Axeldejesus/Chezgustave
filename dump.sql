--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: LogementEquipment; Type: TABLE; Schema: public; Owner: chez_gustave
--

CREATE TABLE public."LogementEquipment" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "logementId" integer NOT NULL,
    "equipmentId" integer NOT NULL
);


ALTER TABLE public."LogementEquipment" OWNER TO chez_gustave;

--
-- Name: equipment; Type: TABLE; Schema: public; Owner: chez_gustave
--

CREATE TABLE public.equipment (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.equipment OWNER TO chez_gustave;

--
-- Name: equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: chez_gustave
--

CREATE SEQUENCE public.equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipment_id_seq OWNER TO chez_gustave;

--
-- Name: equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chez_gustave
--

ALTER SEQUENCE public.equipment_id_seq OWNED BY public.equipment.id;


--
-- Name: logements; Type: TABLE; Schema: public; Owner: chez_gustave
--

CREATE TABLE public.logements (
    id integer NOT NULL,
    nom character varying(255),
    images character varying(255)[],
    secteur character varying(255),
    description text,
    tarif_bas double precision,
    tarif_moyen double precision,
    tarif_haut double precision,
    m_carre double precision,
    chambre integer,
    salle_de_bain integer,
    categorie character varying(255),
    type character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.logements OWNER TO chez_gustave;

--
-- Name: logements_id_seq; Type: SEQUENCE; Schema: public; Owner: chez_gustave
--

CREATE SEQUENCE public.logements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logements_id_seq OWNER TO chez_gustave;

--
-- Name: logements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chez_gustave
--

ALTER SEQUENCE public.logements_id_seq OWNED BY public.logements.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: chez_gustave
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    rated integer NOT NULL,
    text character varying(255),
    "logementId" integer,
    "reservationId" integer,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ratings OWNER TO chez_gustave;

--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: chez_gustave
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ratings_id_seq OWNER TO chez_gustave;

--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chez_gustave
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: reservations; Type: TABLE; Schema: public; Owner: chez_gustave
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    chef_cuisine boolean DEFAULT false,
    visite timestamp with time zone,
    "logementId" integer,
    "userId" integer,
    "ratingId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.reservations OWNER TO chez_gustave;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: chez_gustave
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_id_seq OWNER TO chez_gustave;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chez_gustave
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: chez_gustave
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    tel character varying(255),
    password character varying(255) NOT NULL,
    is_admin boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO chez_gustave;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: chez_gustave
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO chez_gustave;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chez_gustave
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: equipment id; Type: DEFAULT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.equipment ALTER COLUMN id SET DEFAULT nextval('public.equipment_id_seq'::regclass);


--
-- Name: logements id; Type: DEFAULT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.logements ALTER COLUMN id SET DEFAULT nextval('public.logements_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: LogementEquipment; Type: TABLE DATA; Schema: public; Owner: chez_gustave
--

COPY public."LogementEquipment" ("createdAt", "updatedAt", "logementId", "equipmentId") FROM stdin;
2024-03-11 09:09:49.253+00	2024-03-11 09:09:49.253+00	6	1
2024-03-11 09:09:49.265+00	2024-03-11 09:09:49.265+00	6	2
2024-03-11 09:10:35.331+00	2024-03-11 09:10:35.331+00	7	1
2024-03-11 09:10:35.333+00	2024-03-11 09:10:35.333+00	7	2
2024-03-11 09:21:31.232+00	2024-03-11 09:21:31.232+00	5	1
2024-03-11 09:21:31.232+00	2024-03-11 09:21:31.232+00	5	2
2024-03-11 12:13:08.305+00	2024-03-11 12:13:08.305+00	12	1
2024-03-11 12:13:08.305+00	2024-03-11 12:13:08.305+00	12	2
2024-03-11 12:13:08.305+00	2024-03-11 12:13:08.305+00	12	3
2024-03-11 12:15:14.827+00	2024-03-11 12:15:14.827+00	13	1
2024-03-11 12:15:14.827+00	2024-03-11 12:15:14.827+00	13	2
2024-03-11 12:15:14.827+00	2024-03-11 12:15:14.827+00	13	3
2024-03-11 12:17:36.119+00	2024-03-11 12:17:36.119+00	14	1
2024-03-11 12:17:36.119+00	2024-03-11 12:17:36.119+00	14	2
2024-03-11 12:17:36.119+00	2024-03-11 12:17:36.119+00	14	3
2024-03-11 12:19:31.409+00	2024-03-11 12:19:31.409+00	15	1
2024-03-11 12:19:31.409+00	2024-03-11 12:19:31.409+00	15	2
2024-03-11 12:19:31.409+00	2024-03-11 12:19:31.409+00	15	3
\.


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: chez_gustave
--

COPY public.equipment (id, name, "createdAt", "updatedAt") FROM stdin;
1	Piscine	2024-03-11 08:45:32.097+00	2024-03-11 08:45:32.097+00
2	Jardin	2024-03-11 08:45:41.696+00	2024-03-11 08:45:41.696+00
3	Tennis	2024-03-11 08:45:52.001+00	2024-03-11 08:45:52.001+00
4	Golf	2024-03-11 08:46:00.691+00	2024-03-11 08:46:00.691+00
5	Spa	2024-03-11 08:46:10.619+00	2024-03-11 08:46:10.619+00
6	Jacuzzi	2024-03-11 08:46:21.091+00	2024-03-11 08:46:21.091+00
7	Parc de jeux	2024-03-11 08:46:45.776+00	2024-03-11 08:46:45.776+00
\.


--
-- Data for Name: logements; Type: TABLE DATA; Schema: public; Owner: chez_gustave
--

COPY public.logements (id, nom, images, secteur, description, tarif_bas, tarif_moyen, tarif_haut, m_carre, chambre, salle_de_bain, categorie, type, "createdAt", "updatedAt") FROM stdin;
5	Burron des cimes	{http://localhost:3630/src/uploads/Serre-Chevalier-img0.jpg}	Serre-Chevalier	Le luxe au coeur des montagnes!	8000	11000	15000	600	20	20	Maison	Location	2024-03-11 09:08:24.066+00	2024-03-11 09:08:24.066+00
13	Guarrigue	{http://localhost:3630/src/uploads/Saint-Maximin-img0.jpg}	Saint-Maximin	Monter sur la Sainte Victoire et voir la mer, une fois dans sa vie! Savourer le beurre de truffe lors me gusta paella trainants!	3000	5000	8000	300	10	5	Maison	Location	2024-03-11 12:15:04.226+00	2024-03-11 12:15:04.226+00
14	Alpage	{http://localhost:3630/src/uploads/Voiron-img0.jpg}	Voiron	bonjour	2000	4000	5000	200	7	4	Maison	Location	2024-03-11 12:17:26.14+00	2024-03-11 12:17:26.14+00
15	La cabane	{http://localhost:3630/src/uploads/Cahors-img0.jpg}	Cahors	Un nid parfait pour renouveler votre amour!	1500	2500	3500	110	4	2	Maison	Location	2024-03-11 12:19:23.998+00	2024-03-11 12:19:23.998+00
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: chez_gustave
--

COPY public.ratings (id, rated, text, "logementId", "reservationId", "userId", "createdAt", "updatedAt") FROM stdin;
2	3	Super logement	5	2	10	2024-03-11 12:24:24.914+00	2024-03-11 12:24:24.914+00
\.


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: chez_gustave
--

COPY public.reservations (id, start_date, end_date, chef_cuisine, visite, "logementId", "userId", "ratingId", "createdAt", "updatedAt") FROM stdin;
2	2021-12-10 00:00:00+00	2021-12-20 00:00:00+00	t	2021-12-10 00:00:00+00	5	10	2	2024-03-11 12:23:48.648+00	2024-03-11 12:25:47.593+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: chez_gustave
--

COPY public.users (id, email, name, tel, password, is_admin, "createdAt", "updatedAt") FROM stdin;
1	axelteixeiradejesus@gmail.com	Axel Teixeira de Jesus	123456789000	$2b$10$GKhDgWVISNXlpylL3UmSw.qcw7bVdyRgHiOBNfUXj63EaCasrD8L.	t	2024-03-11 08:35:01.239+00	2024-03-11 08:35:01.239+00
3	Testgustave1@gmail.com	Gustave Maurice	12345678900	$2b$10$o4cNye6zM0r.GBbf0wZaLuR1pcgW/012f4W/1b/itab8muQrTAxqq	t	2024-03-11 08:37:21.836+00	2024-03-11 08:37:21.836+00
4	Testgustave2@gmail.com	Michel Fran├ºois	1234567890	$2b$10$jjEaRcEUhWb4mlk3iHyHDOg6O25Zy/2X1LzfDX8zyYh3.YKHo66R2	t	2024-03-11 08:38:17.898+00	2024-03-11 08:38:17.898+00
5	Testgustave3@gmail.com	Jean	123456789	$2b$10$JsYQN3OF2VPlM3yZnwEvi.AMvC.YH6RS8/AmLdWnmg.dZ/Q0hB84K	t	2024-03-11 08:38:45.364+00	2024-03-11 08:38:45.364+00
6	Testgustave4@gmail.com	Pierre	12345678	$2b$10$TcQcVUIL6/2ULfhJr7WzMemR3Qyu2ZQsgdM.p54PnIxzwO6Q92MUq	t	2024-03-11 08:39:04.214+00	2024-03-11 08:39:04.214+00
7	Testgustave5@gmail.com	Jacques	1234567	$2b$10$Vljkq9ZrhKIxixAi7jIiXeNzPOmnIXwz0E8LFpyF1CsT63SK5E7Xu	t	2024-03-11 08:39:23.458+00	2024-03-11 08:39:23.458+00
9	Testgustave6@gmail.com	Rowan	12345677	$2b$10$NbPOB1blV9dwIU4MGMd8O.50688MnCX6bvShUcN/vuwZQHagjXd1m	f	2024-03-11 08:40:54.253+00	2024-03-11 08:40:54.253+00
10	Testgustave7@gmail.com	Chauve	123456778	$2b$10$kCLE3ellWKtitV/Mi7sYpuIak13HdskakjZ7jRFwHLZoPklkBVCae	f	2024-03-11 08:41:14.851+00	2024-03-11 08:41:14.851+00
\.


--
-- Name: equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chez_gustave
--

SELECT pg_catalog.setval('public.equipment_id_seq', 7, true);


--
-- Name: logements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chez_gustave
--

SELECT pg_catalog.setval('public.logements_id_seq', 15, true);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chez_gustave
--

SELECT pg_catalog.setval('public.ratings_id_seq', 2, true);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chez_gustave
--

SELECT pg_catalog.setval('public.reservations_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chez_gustave
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: LogementEquipment LogementEquipment_pkey; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public."LogementEquipment"
    ADD CONSTRAINT "LogementEquipment_pkey" PRIMARY KEY ("logementId", "equipmentId");


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (id);


--
-- Name: logements logements_pkey; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.logements
    ADD CONSTRAINT logements_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key10; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);


--
-- Name: users users_email_key11; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key11 UNIQUE (email);


--
-- Name: users users_email_key12; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key12 UNIQUE (email);


--
-- Name: users users_email_key13; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key13 UNIQUE (email);


--
-- Name: users users_email_key14; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key14 UNIQUE (email);


--
-- Name: users users_email_key15; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key15 UNIQUE (email);


--
-- Name: users users_email_key16; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key16 UNIQUE (email);


--
-- Name: users users_email_key17; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key17 UNIQUE (email);


--
-- Name: users users_email_key18; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key18 UNIQUE (email);


--
-- Name: users users_email_key19; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key19 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key20; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key20 UNIQUE (email);


--
-- Name: users users_email_key21; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key21 UNIQUE (email);


--
-- Name: users users_email_key22; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key22 UNIQUE (email);


--
-- Name: users users_email_key23; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key23 UNIQUE (email);


--
-- Name: users users_email_key24; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key24 UNIQUE (email);


--
-- Name: users users_email_key25; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key25 UNIQUE (email);


--
-- Name: users users_email_key26; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key26 UNIQUE (email);


--
-- Name: users users_email_key27; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key27 UNIQUE (email);


--
-- Name: users users_email_key28; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key28 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- Name: users users_email_key9; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_tel_key; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key UNIQUE (tel);


--
-- Name: users users_tel_key1; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key1 UNIQUE (tel);


--
-- Name: users users_tel_key10; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key10 UNIQUE (tel);


--
-- Name: users users_tel_key11; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key11 UNIQUE (tel);


--
-- Name: users users_tel_key12; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key12 UNIQUE (tel);


--
-- Name: users users_tel_key13; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key13 UNIQUE (tel);


--
-- Name: users users_tel_key14; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key14 UNIQUE (tel);


--
-- Name: users users_tel_key15; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key15 UNIQUE (tel);


--
-- Name: users users_tel_key16; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key16 UNIQUE (tel);


--
-- Name: users users_tel_key17; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key17 UNIQUE (tel);


--
-- Name: users users_tel_key18; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key18 UNIQUE (tel);


--
-- Name: users users_tel_key19; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key19 UNIQUE (tel);


--
-- Name: users users_tel_key2; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key2 UNIQUE (tel);


--
-- Name: users users_tel_key20; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key20 UNIQUE (tel);


--
-- Name: users users_tel_key21; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key21 UNIQUE (tel);


--
-- Name: users users_tel_key22; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key22 UNIQUE (tel);


--
-- Name: users users_tel_key23; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key23 UNIQUE (tel);


--
-- Name: users users_tel_key24; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key24 UNIQUE (tel);


--
-- Name: users users_tel_key25; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key25 UNIQUE (tel);


--
-- Name: users users_tel_key26; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key26 UNIQUE (tel);


--
-- Name: users users_tel_key27; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key27 UNIQUE (tel);


--
-- Name: users users_tel_key28; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key28 UNIQUE (tel);


--
-- Name: users users_tel_key3; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key3 UNIQUE (tel);


--
-- Name: users users_tel_key4; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key4 UNIQUE (tel);


--
-- Name: users users_tel_key5; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key5 UNIQUE (tel);


--
-- Name: users users_tel_key6; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key6 UNIQUE (tel);


--
-- Name: users users_tel_key7; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key7 UNIQUE (tel);


--
-- Name: users users_tel_key8; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key8 UNIQUE (tel);


--
-- Name: users users_tel_key9; Type: CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tel_key9 UNIQUE (tel);


--
-- Name: ratings ratings_logementId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "ratings_logementId_fkey" FOREIGN KEY ("logementId") REFERENCES public.logements(id);


--
-- Name: ratings ratings_reservationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "ratings_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES public.reservations(id);


--
-- Name: ratings ratings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: reservations reservations_logementId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "reservations_logementId_fkey" FOREIGN KEY ("logementId") REFERENCES public.logements(id);


--
-- Name: reservations reservations_ratingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "reservations_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES public.ratings(id);


--
-- Name: reservations reservations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chez_gustave
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

