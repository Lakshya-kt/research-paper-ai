from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model=SentenceTransformer("all-MiniLM-L6-v2")
document_chunks=[]
index=None

def create_chunks(text,chunk_size=500):
    chunks=[]
    for i in range(0,len(text),chunk_size):
        chunks.append(text[i:i+chunk_size])
        
    return chunks

def build_vector_store(text):
    global document_chunks
    global index
    document_chunks=create_chunks(text)
    
    embeddings=model.encode(document_chunks)
    dimension=embeddings.shape[1]
    index=faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))
    
def retrieve_relevant_chunks(query,k=3):
    global index
    if index is None:
        return ["No document uploaded yet."]
    
    query_embedding=model.encode([query])
    distances, indices=index.search(
        np.array(query_embedding),
        k)
    results=[]
    for idx in indices[0]:
        results.append(document_chunks[idx])
    
    return results
    