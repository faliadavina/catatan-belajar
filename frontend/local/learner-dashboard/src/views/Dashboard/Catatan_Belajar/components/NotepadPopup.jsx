import React, { useState } from "react";
import { BsThreeDots, BsLock, BsUnlock } from "react-icons/bs";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { Navbar, Container, Button, Form, Dropdown, Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FiImage } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { RiPriceTag2Line } from "react-icons/ri";
import { PiTagSimple } from "react-icons/pi";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";
import "./Notepad.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Notepad = () => {
    const [showNotepad, setShowNotepad] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [judulNotepad, setJudulNotepad] = useState("");
    const [isiNotepad, setIsiNotepad] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [privateNote, setPrivateNote] = useState(false);
    const [fontCase, setFontCase] = useState("normal");
    const [showTagModal, setShowTagModal] = useState(false);
    const [showFontOptions, setShowFontOptions] = useState(false);

    const openNotepad = () => {
        setShowNotepad(true);
        setIsMinimized(false);
    };

    const closeNotepad = () => {
        setShowNotepad(false);
    };

    const handleJudulInputChange = (event) => {
        setJudulNotepad(event.target.value);
    };

    const handleIsiInputChange = (event) => {
        setIsiNotepad(event.target.value);
    };

    const maximizeNotepad = () => {
        setIsMinimized(false);
        setIsFullscreen(false);
    };

    const minimizeNotepad = () => {
        setIsMinimized(true);
        setIsFullscreen(false);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        setIsMinimized(false);
    };

    const deleteNote = () => {
        setJudulNotepad("");
        setIsiNotepad("");
    };

    const handleFontCaseChange = (caseType) => {
        setFontCase(caseType);
        let text = isiNotepad;
        switch (caseType) {
            case "UPPERCASE":
                text = text.toUpperCase();
                break;
            case "lowercase":
                text = text.toLowerCase();
                break;
            case "sentence case":
                text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                break;
            case "Capitalize Each Word":
                text = text
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ");
                break;
            default:
                break;
        }
        setIsiNotepad(text);
    };

    const toggleBold = () => setBold(!bold);
    const toggleItalic = () => setItalic(!italic);
    const toggleUnderline = () => setUnderline(!underline);
    const togglePrivateNote = () => setPrivateNote(!privateNote);
    const toggleFontOptions = () => setShowFontOptions(!showFontOptions);

    const handleFontSizeChange = (event) => setFontSize(event.target.value);
    const handleFontFamilyChange = (event) => setFontFamily(event.target.value);

    const handleOpenTagModal = () => setShowTagModal(true);
    const handleCloseTagModal = () => setShowTagModal(false);

    return (
        <div className="Notepad">
            <Container>
                <Navbar bg="light">
                    <Navbar.Brand href="#home">Notepad</Navbar.Brand>
                </Navbar>
            </Container>
            <Container>
                <Button onClick={openNotepad}>Tambah</Button>
                {showNotepad && (
                    <div className={`Notepad-body ${isFullscreen ? "fullscreen" : isMinimized ? "minimized" : ""}`}>
                        {isMinimized ? (
                            <div className="button-notepad-minimized">
                                <Button onClick={closeNotepad}>
                                    <IoClose />
                                </Button>
                                <Button onClick={maximizeNotepad}>
                                    <FiMaximize2 />
                                </Button>
                            </div>
                        ) : (
                            <div className="button-notepad">
                                <Button onClick={closeNotepad}>
                                    <IoClose />
                                </Button>
                                <Button onClick={toggleFullscreen}>{isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}</Button>
                                <Button onClick={minimizeNotepad}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                            </div>
                        )}
                        {!isMinimized && (
                            <div>
                                <div className="Notepad-judul">
                                    <input type="text" placeholder="Judul" value={judulNotepad} onChange={handleJudulInputChange} />
                                </div>
                                <div className="Notepad-isi">
                                    <textarea
                                        placeholder="Buat Catatan ..."
                                        value={isiNotepad}
                                        onChange={handleIsiInputChange}
                                        style={{ fontFamily, fontSize, fontWeight: bold ? "bold" : "normal", fontStyle: italic ? "italic" : "normal", textDecoration: underline ? "underline" : "none" }}
                                    />
                                    <Container>
                                        <div className="button-text">
                                            <Button className="add-image">
                                                <FiImage />
                                            </Button>
                                            <div className="font-button">
                                                <Form.Group controlId="formFontFamily">
                                                    <Form.Control as="select" value={fontFamily} onChange={handleFontFamilyChange} className="custom-form-control" style={{ fontSize: "0.7em" }}>
                                                        <option>Arial</option>
                                                        <option>Times New Roman</option>
                                                        <option>Verdana</option>
                                                        <option>Georgia</option>
                                                        <option>Courier New</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            <div className="change-case">
                                                <Dropdown onSelect={(e) => handleFontCaseChange(e)}>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        aA
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="UPPERCASE">UPPERCASE</Dropdown.Item>
                                                        <Dropdown.Item eventKey="lowercase">lowercase</Dropdown.Item>
                                                        <Dropdown.Item eventKey="sentence case">Sentence case</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Capitalize Each Word">Capitalize Each Word</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <Button onClick={toggleBold}>
                                                <FaBold />
                                            </Button>
                                            <Button onClick={toggleItalic}>
                                                <FaItalic />
                                            </Button>
                                            <Button onClick={toggleUnderline}>
                                                <FaUnderline />
                                            </Button>
                                            <Button onClick={togglePrivateNote} style={{ margin: "10px", padding: "5px" }}>
                                                <span style={{ display: "flex", alignItems: "center" }}>
                                                    {privateNote ? (
                                                        <>
                                                            <FaToggleOn />
                                                            <span style={{ marginLeft: "10px", marginRight:"10px" }}>Private</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaToggleOff />
                                                            <span style={{ marginLeft: "10px", marginRight:"10px"}}>Public</span>
                                                        </>
                                                    )}
                                                </span>
                                            </Button>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    <BsThreeDots />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <div>
                                                            <Form.Group controlId="titik-tiga">
                                                                <Button onClick={deleteNote} style={{ display: "block", width: "100%", textAlign: "left" }}>
                                                                    <AiFillDelete style={{ color: "red", fontSize: "15px" }} />
                                                                    <span style={{ marginLeft: "10px" }}>Hapus Catatan</span>
                                                                </Button>
                                                                <Button onClick={handleOpenTagModal} style={{ display: "block", width: "100%", textAlign: "left" }}>
                                                                    <PiTagSimple style={{ fontSize: "15px" }} />
                                                                    <span style={{ marginLeft: "10px" }}>Tambahkan Tag</span>
                                                                </Button>
                                                            </Form.Group>
                                                        </div>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <div className="simpan">
                                                <Button className="save-button">Simpan</Button>
                                            </div>
                                        </div>
                                        <Modal show={showTagModal} onHide={handleCloseTagModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Tag</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form.Control type="text" placeholder="Masukkan tag" />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseTagModal}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleCloseTagModal}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Container>
                                </div>
                            </div>
                        )}
                        {isMinimized && (
                            <div className="Notepad-minimized">
                                <p>{judulNotepad}</p>
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Notepad;
