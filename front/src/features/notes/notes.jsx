'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { getApiClient } from "@/common/api/client"
import { PlusIcon, Pencil, Trash } from 'lucide-react'
import { jwtDecode } from 'jwt-decode';

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [apiClient, setApiClient] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const client = getApiClient();
      client.setAccessToken(token);
      setApiClient(client);

      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (apiClient) {
      fetchNotes()
    }
  }, [apiClient])

  const fetchNotes = async () => {
    try {
      const response = await apiClient.get('api/ideas')
      const data = await response.json()
      setNotes(data.ideas)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiClient) {
      console.error("API client is not initialized.");
      return;
    }

    try {
      const url = editingId ? `api/ideas/${editingId}` : 'api/ideas';
      const method = editingId ? apiClient.patch.bind(apiClient) : apiClient.post.bind(apiClient);
      await method(url, { title, content });
      fetchNotes();
      setTitle('');
      setContent('');
      setEditingId(userId);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note._id)
  }

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`api/ideas/${id}`)
      fetchNotes()
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Note' : 'Create New Note'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {editingId ? 'Update' : 'Create'} <PlusIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note._id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>Created at: {new Date(note.createdAt).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => handleEdit(note)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(note._id)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
