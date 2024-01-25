import { myFirebase, db, schema } from "../firebase/firebase";

export const PUSH_REQUEST = "PUSH_REQUEST";
export const PUSH_SUCCESS = "PUSH_SUCCESS";
export const PUSH_FAILURE = "PUSH_FAILURE"; 

const requestPush = () => {
    return {
        type: PUSH_REQUEST
    };
};

const receivePush = user => {
    return {
        type: PUSH_SUCCESS,
    };
};

const pushError = () => {
    return {
        type: PUSH_FAILURE
    };
};

export const addConcept = (title, concept, description, link, type, depth, is_hands_on, uid) => dispatch => {
    dispatch(requestPush());
    db.collection(schema.RESOURCES).add({
        "title": title,
        "concept": concept,
        "description": description,
        "link": link,
        "type": type,
        "depth": depth,
        "is_hands_on": is_hands_on,
        "user": uid
    })
    .then((docRef) => {
        dispatch(receivePush());
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        dispatch(pushError());
        console.error("Error adding document: ", error);
    })
};
