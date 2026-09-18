import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug, getAllArticles } from '../utils/articles';
import MarkdownRenderer from '../components/article/MarkdownRenderer';
import { ArrowLeft } from 'lucide-react';
import '../styles/scenes/editorial.css';

const ArticleView = () => {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const relatedArticle = useMemo(() => {
    if (!article) return null;
    const all = getAllArticles();
    if (all.length > 1) {
      const others = all.filter(a => a.slug !== slug);
      let related = others.find(a => article?.categories?.some(c => a.categories?.includes(c)));
      if (!related) related = others[0];
      return related;
    }
    return null;
  }, [article, slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <div className="bureau-container" style={{ padding: '20vh 0', color: 'var(--color-silver)', fontFamily: 'var(--font-mono)' }}>LOCATING FILE...</div>;

  return (
    <article className="blog-reader-scene">
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress-bar" 
        style={{ 
          position: 'fixed', top: 0, left: 0, height: '4px', 
          backgroundColor: 'var(--color-gold)', zIndex: 100, 
          width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' 
        }} 
      />

      <div className="bureau-container">
        
        {/* Navigation Bar */}
        <div className="reader-nav">
          <Link to="/writing" className="reader-back-btn">
            <ArrowLeft size={18} />
            BACK TO WRITING
          </Link>
          <span className="reader-meta-tag">[ {article.type || 'DEEP DIVE'} ]</span>
        </div>

        {/* Reader Layout: Left Sidebar + Right Content */}
        <div className="reader-grid">
          
          {/* Left Sidebar (Sticky) */}
          <aside className="reader-sidebar">
            <div className="sidebar-sticky">
              <div className="sidebar-meta-block">
                <span className="sidebar-meta-label">DATE</span>
                <span className="sidebar-meta-value">{article.date}</span>
              </div>
              <div className="sidebar-meta-block">
                <span className="sidebar-meta-label">READ TIME</span>
                <span className="sidebar-meta-value">{article.readingTime}</span>
              </div>
              <div className="sidebar-meta-block">
                <span className="sidebar-meta-label">CATEGORIES</span>
                <div className="sidebar-categories">
                  {(article.categories || []).map(cat => (
                    <Link key={cat} to={`/writing/category/${cat}`} className="sidebar-category-link">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {relatedArticle && (
                <div className="sidebar-related">
                  <span className="sidebar-meta-label">RELATED CASE FILE</span>
                  <Link to={`/writing/${relatedArticle.slug}`} className="sidebar-related-link">
                    {relatedArticle.title}
                  </Link>
                </div>
              )}
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="reader-main">
            <header className="reader-header">
              <h1 className="reader-title">{article.title}</h1>
              {article.subtitle && <p className="reader-subtitle">{article.subtitle}</p>}
            </header>

            {article.heroImage && (
              <div className="reader-hero-img-wrapper">
                <img src={article.heroImage} alt={article.title} className="reader-hero-img" />
              </div>
            )}

            <div className="reader-content">
              <MarkdownRenderer content={article.content} />
            </div>

            {/* Author Card & Share Section */}
            <div className="article-extras">
              <div className="article-share-section">
                <span className="share-label">SHARE DISCOVERY</span>
                <div className="share-buttons">
                  <button className="share-btn" onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard");
                  }}>COPY LINK</button>
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noreferrer" className="share-btn">X / TWITTER</a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(article.title)}`} target="_blank" rel="noreferrer" className="share-btn">LINKEDIN</a>
                </div>
              </div>

              <div className="article-author-card">
                <img src="/me.JPG" alt="Calvin Dsouza" className="author-avatar" />
                <div className="author-info">
                  <span className="author-label">WRITTEN BY</span>
                  <h3 className="author-name">Calvin Dsouza</h3>
                  <p className="author-bio">Building intelligent systems and trying to understand why things break at scale. Currently exploring the intersection of AI, signal processing, and systems engineering.</p>
                </div>
              </div>
            </div>

            <footer className="reader-footer">
              <div className="reader-footer-divider"></div>
              <div className="reader-footer-content">
                <div className="reader-footer-brand">
                  <span className="brand-name">THE BUREAU</span>
                  <span className="brand-est">EST. 2024</span>
                </div>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="reader-top-btn">
                  BACK TO TOP ↑
                </button>
              </div>
            </footer>
          </main>

        </div>
      </div>
    </article>
  );
};

export default ArticleView;
