--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.16
-- Dumped by pg_dump version 12.0

-- Started on 2020-09-16 20:35:01

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

--
-- TOC entry 184 (class 1259 OID 32962)
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    id integer NOT NULL,
    number character varying,
    name character(50),
    oldnum boolean,
    internum boolean
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 33001)
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_id_seq OWNER TO postgres;

--
-- TOC entry 2147 (class 0 OID 0)
-- Dependencies: 189
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;


--
-- TOC entry 181 (class 1259 OID 32953)
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    category character(100),
    detention_date character(20),
    detention_time character(20),
    detention_reason character varying(200),
    detention_by character varying,
    keeping_place character varying,
    additional character varying,
    event_id integer NOT NULL
);


ALTER TABLE public.event OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 32971)
-- Name: event_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_event_id_seq OWNER TO postgres;

--
-- TOC entry 2148 (class 0 OID 0)
-- Dependencies: 186
-- Name: event_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_event_id_seq OWNED BY public.event.event_id;


--
-- TOC entry 185 (class 1259 OID 32965)
-- Name: event_person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_person (
);


ALTER TABLE public.event_person OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 32956)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    lastname character(50),
    name character(50),
    midname character(50),
    alias character(50),
    id integer NOT NULL
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 32982)
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO postgres;

--
-- TOC entry 2149 (class 0 OID 0)
-- Dependencies: 187
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- TOC entry 183 (class 1259 OID 32959)
-- Name: telephone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.telephone (
    id integer NOT NULL,
    number character varying,
    oldnum boolean,
    internum boolean
);


ALTER TABLE public.telephone OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 32990)
-- Name: telephone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.telephone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.telephone_id_seq OWNER TO postgres;

--
-- TOC entry 2150 (class 0 OID 0)
-- Dependencies: 188
-- Name: telephone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.telephone_id_seq OWNED BY public.telephone.id;


--
-- TOC entry 2009 (class 2604 OID 33003)
-- Name: contact id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);


--
-- TOC entry 2006 (class 2604 OID 32973)
-- Name: event event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN event_id SET DEFAULT nextval('public.event_event_id_seq'::regclass);


--
-- TOC entry 2007 (class 2604 OID 32984)
-- Name: person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- TOC entry 2008 (class 2604 OID 32992)
-- Name: telephone id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telephone ALTER COLUMN id SET DEFAULT nextval('public.telephone_id_seq'::regclass);


--
-- TOC entry 2135 (class 0 OID 32962)
-- Dependencies: 184
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2132 (class 0 OID 32953)
-- Dependencies: 181
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event (category, detention_date, detention_time, detention_reason, detention_by, keeping_place, additional, event_id) VALUES ('111                                                                                                 ', '10.02.2020          ', '17:40               ', '111', '111', '111', '111', 1);
INSERT INTO public.event (category, detention_date, detention_time, detention_reason, detention_by, keeping_place, additional, event_id) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);


--
-- TOC entry 2136 (class 0 OID 32965)
-- Dependencies: 185
-- Data for Name: event_person; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2133 (class 0 OID 32956)
-- Dependencies: 182
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2134 (class 0 OID 32959)
-- Dependencies: 183
-- Data for Name: telephone; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2151 (class 0 OID 0)
-- Dependencies: 189
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_id_seq', 1, false);


--
-- TOC entry 2152 (class 0 OID 0)
-- Dependencies: 186
-- Name: event_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_event_id_seq', 2, true);


--
-- TOC entry 2153 (class 0 OID 0)
-- Dependencies: 187
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_id_seq', 1, false);


--
-- TOC entry 2154 (class 0 OID 0)
-- Dependencies: 188
-- Name: telephone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.telephone_id_seq', 1, false);


--
-- TOC entry 2017 (class 2606 OID 33011)
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- TOC entry 2011 (class 2606 OID 32981)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 2013 (class 2606 OID 32989)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- TOC entry 2015 (class 2606 OID 33000)
-- Name: telephone telephone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telephone
    ADD CONSTRAINT telephone_pkey PRIMARY KEY (id);


--
-- TOC entry 2146 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2020-09-16 20:35:01

--
-- PostgreSQL database dump complete
--

