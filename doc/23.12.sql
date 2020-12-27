--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.16
-- Dumped by pg_dump version 11.3

-- Started on 2020-12-23 11:14:09

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

--
-- TOC entry 11 (class 2615 OID 33287)
-- Name: notebook2; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA notebook2;


SET default_with_oids = false;

--
-- TOC entry 202 (class 1259 OID 33374)
-- Name: contact; Type: TABLE; Schema: notebook2; Owner: -
--

CREATE TABLE notebook2.contact (
    number character varying,
    alias character varying,
    oldnum boolean DEFAULT false,
    internum boolean DEFAULT false,
    id integer NOT NULL,
    telephone_id integer NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 33409)
-- Name: contact_id_seq; Type: SEQUENCE; Schema: notebook2; Owner: -
--

CREATE SEQUENCE notebook2.contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2260 (class 0 OID 0)
-- Dependencies: 208
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: notebook2; Owner: -
--

ALTER SEQUENCE notebook2.contact_id_seq OWNED BY notebook2.contact.id;


--
-- TOC entry 203 (class 1259 OID 33380)
-- Name: event; Type: TABLE; Schema: notebook2; Owner: -
--

CREATE TABLE notebook2.event (
    category character varying,
    detention_date character varying,
    detention_time character varying,
    detention_reason character varying(200),
    detention_by character varying,
    keeping_place character varying,
    additional character varying,
    id integer NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 33398)
-- Name: event_id_seq; Type: SEQUENCE; Schema: notebook2; Owner: -
--

CREATE SEQUENCE notebook2.event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2261 (class 0 OID 0)
-- Dependencies: 207
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: notebook2; Owner: -
--

ALTER SEQUENCE notebook2.event_id_seq OWNED BY notebook2.event.id;


--
-- TOC entry 204 (class 1259 OID 33386)
-- Name: event_person; Type: TABLE; Schema: notebook2; Owner: -
--

CREATE TABLE notebook2.event_person (
    event_id integer NOT NULL,
    person_id integer NOT NULL
);


--
-- TOC entry 205 (class 1259 OID 33389)
-- Name: person; Type: TABLE; Schema: notebook2; Owner: -
--

CREATE TABLE notebook2.person (
    lastname character varying,
    name character varying,
    midname character varying,
    alias character varying,
    id integer NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 33420)
-- Name: person_id_seq; Type: SEQUENCE; Schema: notebook2; Owner: -
--

CREATE SEQUENCE notebook2.person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2262 (class 0 OID 0)
-- Dependencies: 209
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: notebook2; Owner: -
--

ALTER SEQUENCE notebook2.person_id_seq OWNED BY notebook2.person.id;


--
-- TOC entry 206 (class 1259 OID 33392)
-- Name: telephone; Type: TABLE; Schema: notebook2; Owner: -
--

CREATE TABLE notebook2.telephone (
    number character varying,
    id integer NOT NULL,
    person_id integer NOT NULL,
    oldnum boolean DEFAULT false,
    internum boolean DEFAULT false
);


--
-- TOC entry 210 (class 1259 OID 33429)
-- Name: telephone_id_seq; Type: SEQUENCE; Schema: notebook2; Owner: -
--

CREATE SEQUENCE notebook2.telephone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2263 (class 0 OID 0)
-- Dependencies: 210
-- Name: telephone_id_seq; Type: SEQUENCE OWNED BY; Schema: notebook2; Owner: -
--

ALTER SEQUENCE notebook2.telephone_id_seq OWNED BY notebook2.telephone.id;


--
-- TOC entry 2109 (class 2604 OID 33411)
-- Name: contact id; Type: DEFAULT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.contact ALTER COLUMN id SET DEFAULT nextval('notebook2.contact_id_seq'::regclass);


--
-- TOC entry 2112 (class 2604 OID 33400)
-- Name: event id; Type: DEFAULT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.event ALTER COLUMN id SET DEFAULT nextval('notebook2.event_id_seq'::regclass);


--
-- TOC entry 2113 (class 2604 OID 33422)
-- Name: person id; Type: DEFAULT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.person ALTER COLUMN id SET DEFAULT nextval('notebook2.person_id_seq'::regclass);


--
-- TOC entry 2114 (class 2604 OID 33431)
-- Name: telephone id; Type: DEFAULT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.telephone ALTER COLUMN id SET DEFAULT nextval('notebook2.telephone_id_seq'::regclass);


--
-- TOC entry 2246 (class 0 OID 33374)
-- Dependencies: 202
-- Data for Name: contact; Type: TABLE DATA; Schema: notebook2; Owner: -
--

INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('891235466244', 'ДрУг2', false, false, 2, 1);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('891234567788', 'ASd', false, false, 3, 2);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('12412414', '11111', false, false, 9, 9);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('2342525', 'CCCCC', false, false, 11, 10);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('124124124124', '11111', false, false, 8, 1);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('11111', 'ssdsa', true, true, 1, 1);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('2342525', 'CCCCC', false, false, 12, 10);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('123123', 'ASD', false, false, 30, 9);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('89121234422', 'Виталя', false, false, 4, 2);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('111', 'AAAA', false, false, 10, 10);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('111', 'AAA', false, false, 41, 34);
INSERT INTO notebook2.contact (number, alias, oldnum, internum, id, telephone_id) VALUES ('111', 'AAA', false, false, 42, 35);


--
-- TOC entry 2247 (class 0 OID 33380)
-- Dependencies: 203
-- Data for Name: event; Type: TABLE DATA; Schema: notebook2; Owner: -
--

INSERT INTO notebook2.event (category, detention_date, detention_time, detention_reason, detention_by, keeping_place, additional, id) VALUES ('Category', '10.10.10', '10:50', 'Reason', 'MVD', 'MVD', NULL, 1);
INSERT INTO notebook2.event (category, detention_date, detention_time, detention_reason, detention_by, keeping_place, additional, id) VALUES ('111', '', '', '111', '111', '111', '111', 17);


--
-- TOC entry 2248 (class 0 OID 33386)
-- Dependencies: 204
-- Data for Name: event_person; Type: TABLE DATA; Schema: notebook2; Owner: -
--

INSERT INTO notebook2.event_person (event_id, person_id) VALUES (1, 1);
INSERT INTO notebook2.event_person (event_id, person_id) VALUES (1, 3);
INSERT INTO notebook2.event_person (event_id, person_id) VALUES (17, 25);


--
-- TOC entry 2249 (class 0 OID 33389)
-- Dependencies: 205
-- Data for Name: person; Type: TABLE DATA; Schema: notebook2; Owner: -
--

INSERT INTO notebook2.person (lastname, name, midname, alias, id) VALUES ('Иванов', 'Иван', 'Иванович', 'Ваня', 1);
INSERT INTO notebook2.person (lastname, name, midname, alias, id) VALUES ('Дмитриев', 'Дмитрий', 'Дмитриевич', 'Димка', 3);
INSERT INTO notebook2.person (lastname, name, midname, alias, id) VALUES ('ASD', 'ASD', 'ASD', 'ASD', 25);


--
-- TOC entry 2250 (class 0 OID 33392)
-- Dependencies: 206
-- Data for Name: telephone; Type: TABLE DATA; Schema: notebook2; Owner: -
--

INSERT INTO notebook2.telephone (number, id, person_id, oldnum, internum) VALUES ('1234124', 10, 1, false, false);
INSERT INTO notebook2.telephone (number, id, person_id, oldnum, internum) VALUES ('422322', 1, 1, true, true);
INSERT INTO notebook2.telephone (number, id, person_id, oldnum, internum) VALUES ('89142345689', 3, 1, false, false);
INSERT INTO notebook2.telephone (number, id, person_id, oldnum, internum) VALUES ('8914124124', 9, 1, false, false);
INSERT INTO notebook2.telephone (number, id, person_id, oldnum, internum) VALUES ('8915289022', 2, 1, false, false);
INSERT INTO notebook2.telephone (number, id, person_id, oldnum, internum) VALUES ('12414124', 34, 3, false, false);
INSERT INTO notebook2.telephone (number, id, person_id, oldnum, internum) VALUES ('1214124', 35, 25, false, false);


--
-- TOC entry 2264 (class 0 OID 0)
-- Dependencies: 208
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: notebook2; Owner: -
--

SELECT pg_catalog.setval('notebook2.contact_id_seq', 42, true);


--
-- TOC entry 2265 (class 0 OID 0)
-- Dependencies: 207
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: notebook2; Owner: -
--

SELECT pg_catalog.setval('notebook2.event_id_seq', 17, true);


--
-- TOC entry 2266 (class 0 OID 0)
-- Dependencies: 209
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: notebook2; Owner: -
--

SELECT pg_catalog.setval('notebook2.person_id_seq', 25, true);


--
-- TOC entry 2267 (class 0 OID 0)
-- Dependencies: 210
-- Name: telephone_id_seq; Type: SEQUENCE SET; Schema: notebook2; Owner: -
--

SELECT pg_catalog.setval('notebook2.telephone_id_seq', 35, true);


--
-- TOC entry 2118 (class 2606 OID 33419)
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- TOC entry 2122 (class 2606 OID 33441)
-- Name: event_person event_person_pkey; Type: CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.event_person
    ADD CONSTRAINT event_person_pkey PRIMARY KEY (person_id, event_id);


--
-- TOC entry 2120 (class 2606 OID 33408)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- TOC entry 2124 (class 2606 OID 33427)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- TOC entry 2126 (class 2606 OID 33439)
-- Name: telephone telephone_pkey; Type: CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.telephone
    ADD CONSTRAINT telephone_pkey PRIMARY KEY (id);


--
-- TOC entry 2128 (class 2606 OID 33442)
-- Name: event_person event_fk; Type: FK CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.event_person
    ADD CONSTRAINT event_fk FOREIGN KEY (event_id) REFERENCES notebook2.event(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2129 (class 2606 OID 33447)
-- Name: event_person person_fk; Type: FK CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.event_person
    ADD CONSTRAINT person_fk FOREIGN KEY (person_id) REFERENCES notebook2.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2130 (class 2606 OID 33452)
-- Name: telephone person_fk; Type: FK CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.telephone
    ADD CONSTRAINT person_fk FOREIGN KEY (person_id) REFERENCES notebook2.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2127 (class 2606 OID 33457)
-- Name: contact telephone_fk; Type: FK CONSTRAINT; Schema: notebook2; Owner: -
--

ALTER TABLE ONLY notebook2.contact
    ADD CONSTRAINT telephone_fk FOREIGN KEY (telephone_id) REFERENCES notebook2.telephone(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-12-23 11:14:09

--
-- PostgreSQL database dump complete
--

