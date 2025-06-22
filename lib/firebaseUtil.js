// firebaseStorageUtils.js
import { db } from "./firebase";

import { doc, setDoc, collection, getDoc, getDocs, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

// firebaseStorageUtils.js
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

const basepath = 'users'; // Default path for uploads

/**
 * Uploads a file to Firebase Storage and returns its download URL.
 * @param {File} file - The file to upload.
 * @param {string} path - The storage path where the file will be uploaded.
 * @returns {Promise<string>} - A promise that resolves to the download URL.
 */
export async function uploadFileToFirebase(file, path) {
    if (!file) throw new Error("No file provided");

    const storageRef = ref(storage, path);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

/**
 * Lists all files in a given Firebase Storage path.
 * @param {string} path - The storage path to list files from.
 * @returns {Promise<Array<{ name: string, url: string }>>} - A promise that resolves to an array of file objects.
 */
export async function listFilesInFirebase(path = basepath) {
    const folderRef = ref(storage, path);

    try {
        const listResult = await listAll(folderRef);

        // Map over the items to get their names and download URLs
        const files = await Promise.all(
            listResult.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                console.log(itemRef.name, url);
                return { name: itemRef.name, url };
            })
        );

        return files;
    } catch (error) {
        console.error("Error listing files:", error);
        throw error;
    }
}

/**
 * Deletes a file from Firebase Storage.
 * @param {string} path - The storage path of the file to delete (e.g., 'uploads/filename.md').
 * @returns {Promise<void>} - A promise that resolves when the file is successfully deleted.
 */
export async function deleteFileInFirebase(filename, path = basepath) {
    if (!path) throw new Error("File path must be provided");

    const fileRef = ref(storage, `${path}/${filename}`);

    try {
        // Delete the file
        await deleteObject(fileRef);
        console.log(`File deleted: ${filename}`);
    } catch (error) {
        console.error(`Error deleting file at ${filename}:`, error);
        throw error;
    }
}

/**
 * Saves the two Cloud-Storage URLs on the user doc.
 *
 * @param {string} emailId       – users/{emailId}
 * @param {string} passportURL   – download URL for passport PDF
 * @param {string} admissionURL  – download URL for admission PDF
 * @returns {Promise<string>}    – the Firestore doc ID (same as emailId)
 */
export async function uploadData({ emailId, passportURL, admissionURL, passportStatus, admissionStatus, status }) {
    console.log('uploadData called with:', { emailId, passportURL, admissionURL })

    if (!emailId || !passportURL || !admissionURL)
        throw new Error('emailId, passportURL, and admissionURL are required.')

    try {
        const userRef = doc(db, 'users', emailId)

        await setDoc(
            userRef,
            { passportURL, admissionURL, passportStatus, admissionStatus, status },
            { merge: true } // keep any existing fields
        )

        return userRef.id   // == emailId
    } catch (err) {
        console.error('Error saving URLs:', err)
        throw err
    }
}

export async function fetchData(emailId) {
    console.log('TESTING WITH EMAIL:', emailId);

    const userRef = doc(db, 'users', emailId)
    const snap = await getDoc(userRef)
    if (!snap.exists()) {
        console.log('No data found for this user.')
        return null;
    }

    return snap.data()
}

export async function updateData(emailId, status) {
    console.log('uploadData called with:', { emailId, status })

    if (!emailId || !status )
        throw new Error('emailId, stauts are required.')

    try {
        const userRef = doc(db, 'users', emailId)

        await setDoc(
            userRef,
            { passportStatus:status, admissionStatus:status, status },
            { merge: true } // keep any existing fields
        )

        return userRef.id   // == emailId
    } catch (err) {
        console.error('Error saving URLs:', err)
        throw err
    }
}