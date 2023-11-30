import axios from "axios";
import { useEffect, useState } from "react";

const BlogPage = () => {
    const [articles, setArticles] = useState([])

    useEffect(()=> {
        axios.get('https://diag-central-server.vercel.app/blogs')
        .then(res => setArticles(res.data))
    }, [])

    return (
        <div className="container mx-auto mt-8 pb-16">
            <h1 className="text-4xl font-bold mb-6 lg:mx-6">Our Latest Articles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:mx-6">
                {articles.map((article) => (
                    <article key={article.id} className="mb-4 shadow-lg border rounded-md duration-300 hover:shadow-sm text-start">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover mb-4 rounded" />
                        <div className="p-3">
                            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                            <p className="text-gray-600">{article.description}</p>
                            <p className="text-gray-400 mt-2">{article.date}</p>
                            <a href={article.link} className="text-blue-500 block mt-2 hover:underline">
                                Read More
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
