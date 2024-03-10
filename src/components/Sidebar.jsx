export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">
          {/* {index + 1} */}

          {note.body.split("\n")[0]}
        </h4>
        {/* <h6>created at: {}</h6> */}
        <button
          className="delete-btn"
          // onClick={(e) => props.deleteNote(e, note.id)}
          onClick={() => props.deleteNote(note.id)}
          // Your onClick event handler here
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        {" "}
        <i className="fa-regular fa-note-sticky"></i>
        <h4 className="header-logo-title">Note Keeper</h4>
        <button className="new-note" onClick={props.newNote}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {noteElements}
    </section>
  );
}
