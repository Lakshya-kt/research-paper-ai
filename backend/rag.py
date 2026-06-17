import google.generativeai as genai
import faiss
import numpy as np

document_chunks=[]
index=None

def create_chunks(text,chunk_size=500):
    chunks=[]
    for i in range(0,len(text),chunk_size):
        chunks.append(text[i:i+chunk_size])
        
    return chunks

def get_embedding(text):
    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text
    )

    return result["embedding"]

def build_vector_store(text):
    global document_chunks
    global index
    document_chunks=create_chunks(text)
    
    embeddings=[]
    for chunk in document_chunks:
        embeddings.append(get_embedding(chunk))
        
    embeddings = np.array(embeddings).astype("float32")
    dimension=embeddings.shape[1]
    index=faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))
    
def retrieve_relevant_chunks(query, k=3):
    global index

    if index is None:
        return ["No document uploaded yet."]

    query_embedding = np.array(
        [get_embedding(query)]
    ).astype("float32")

    distances, indices = index.search(
        query_embedding,
        k
    )

    results = []

    for idx in indices[0]:
        if idx < len(document_chunks):
            results.append(document_chunks[idx])

    return results
    