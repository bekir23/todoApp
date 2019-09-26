import React from "react";

export default props=>(
    <button onClick={props.toggleComplete} className={
        props.iscompleted ? "btn btn-success" : "btn btn-warning"
    }>{props.iscompleted ? "yes" : "no"}
    </button>
)