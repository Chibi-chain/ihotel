import { useEffect, useState } from "react";
import { useFirebase } from "../firebase";
export const useCollection = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { firestore, rtdb } = useFirebase();
  useEffect(() => {
    if (firestore && path.split("/").length % 2) {
      const unsubscribe = firestore.collection(path).onSnapshot((s) => {
        setLoading(false);
        setData(s.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });

      return () => unsubscribe();
    }
  }, [firestore, path]);

  const createDoc = (data) => {
    firestore.collection(path).add(data);
  };

  const updateDoc = (id, data) => {
    console.log(path, id, data);
    firestore.collection(path).doc(id).set(data, { merge: true });
  };

  const deleteDoc = (id) => {
    firestore.collection(path).doc(id).delete();
  };

  const readDoc = async (id) => {
    if (firestore) {
      const doc = await firestore.collection(path).doc(id).get();

      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    }
  };

  return { data, loading, createDoc, updateDoc, deleteDoc, readDoc };
};

export const useDoc = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { firestore } = useFirebase();

  useEffect(() => {
    if (firestore) {
      firestore
        .doc(path)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setData(doc.data());
            setLoading(false);
          } else {
            setLoading(false);
            return {};
          }
        });
    }
  }, [firestore, path]);

  return { data, loading };
};
