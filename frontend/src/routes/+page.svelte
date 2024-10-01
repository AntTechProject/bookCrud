<script>
  import { onMount } from "svelte";
  let books = [];

  // Fetch books from the backend API
  async function fetchBooks() {
    const response = await fetch("http://localhost:5555/books");
    const data = await response.json();
    books = data.data;
  }

  // Fetch books on component mount
  onMount(fetchBooks);
</script>

<h1>Book List</h1>
<ul>
  {#each books as book}
    <li>
      {book.title} by {book.author} ({book.publishYear})
    </li>
  {/each}
</ul>
