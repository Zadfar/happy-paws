import React, { useEffect, useState } from 'react';

const PostModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [firstName, setFirstName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [note, setNote] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetch(`/api/posts/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage('Could not get the post');
      } else {
        const data = await response.json();
        setFirstName(data.first_name);
        setBreed(data.breed);
        setAge(data.age);
        setNote(data.note);
        setContact(data.contact);
        setImage(data.image_url);
      }
    };

    if (id) {
      getPost();
    }
  }, [id, token, setErrorMessage]);

  const cleanFormData = () => {
    setFirstName('');
    setBreed('');
    setAge('');
    setNote('');
    setContact('');
    setImage(null);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('note', note);
    formData.append('contact', contact);
    if (image) {
      formData.append('file', image);
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    const response = await fetch('/api/posts', requestOptions);
    if (!response.ok) {
      setErrorMessage('Something went wrong when creating post');
    } else {
      cleanFormData();
      handleModal();
    }
    setIsLoading(false);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('note', note);
    formData.append('contact', contact);
    if (image) {
      formData.append('file', image);
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    const response = await fetch(`/api/posts/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage('Something went wrong when updating post');
    } else {
      cleanFormData();
      handleModal();
    }
    setIsLoading(false);
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${active ? 'block' : 'hidden'} z-50`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Create Post</h1>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Breed</label>
              <input
                type="text"
                placeholder="Enter breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Age</label>
              <input
                type="text"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Note</label>
              <input
                type="text"
                placeholder="Enter note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Contact No</label>
              <input
                type="text"
                placeholder="Enter contact no"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </form>
          <div className="flex justify-end">
            {id ? (
              <button
                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleUpdatePost}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            ) : (
              <button
                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleCreatePost}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create'}
              </button>
            )}
            <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={handleModal} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
