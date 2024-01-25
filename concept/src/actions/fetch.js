import { myFirebase, db, schema } from "../firebase/firebase";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE"; 

const requestFetch = () => {
    return {
        type: FETCH_REQUEST
    };
};

const receiveFetch = data => {
    return {
        type: FETCH_SUCCESS,
        data: data
    };
};

const fetchError = () => {
    return {
        type: FETCH_FAILURE
    };
};

export const getResources = () => dispatch => {
    dispatch(requestFetch());
    db.collection(schema.RESOURCES).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            dispatch(receiveFetch(doc.data()))
            console.log(doc.data())
        });
    })
    .catch((error) => {
        dispatch(fetchError());
        console.error("Error fetching documents: ", error);
    })
};
