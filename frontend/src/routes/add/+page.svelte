<script>
  import { goto } from "$app/navigation";

  let title = "";
  let author = "";
  let publishYear = "";

  async function addBook() {
    const response = await fetch("http://localhost:5555/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, publishYear }),
    });

    if (response.ok) {
      alert("Book added successfully!");
      // Optionally, reset form or redirect
    } else {
      alert("Failed to add book.");
    }
    goto("/");
  }
</script>

<h1>Add a New Book</h1>
<form on:submit|preventDefault={addBook}>
  <input type="text" bind:value={title} placeholder="Title" required />
  <input type="text" bind:value={author} placeholder="Author" required />
  <input
    type="number"
    bind:value={publishYear}
    placeholder="Publish Year"
    required
  />
  <button type="submit">Add Book</button>
</form>
