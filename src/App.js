import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sitesData from "./data/sites.json";
import chainsData from "./data/blockchains.json";
import logo from "./asssets/logo.png";
import "./styles/App.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [chainSearch, setChainSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChain, setSelectedChain] = useState("all");

  const getLogo = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch (e) {
      return "https://via.placeholder.com/128?text=W3";
    }
  };

  const filteredSites = sitesData.filter((site) => {
    const matchesSearch = site.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || site.category === selectedCategory;
    const matchesChain =
      selectedChain === "all" ||
      site.chains.includes(selectedChain) ||
      site.chains.includes("all");
    return matchesSearch && matchesCategory && matchesChain;
  });

  const filteredChains = chainsData.filter((c) =>
    c.name.toLowerCase().includes(chainSearch.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-wrapper">
            <img src={logo} alt="SafePlace Logo" className="main-logo" />
            <div className="logo-area">SafePlace</div>
          </div>
          <div className="mobile-socials">
            <a href="#" className="twitter-link">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#1a73e8"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
          </div>
        </div>

        <nav className="category-nav">
          <button
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "active" : ""}
          >
            All
          </button>
          {[
            "swap",
            "staking",
            "lending",
            "bridge",
            "future",
            "cex",
            "infos",
            "gaming",
            "nft",
            "launchpad",
            "social",
            "wallet",
            "infra",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "active" : ""}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="submit-btn"
            onClick={() => alert("Submit coming soon!")}
          >
            Submit Project
          </button>
          <div className="desktop-socials">
            <a href="#" className="twitter-link">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="sticky-header">
          <div className="search-group">
            <input
              type="text"
              className="main-input"
              placeholder="Search protocol (Uniswap, Aave...)"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="blockchain-filter-zone">
            <div className="filter-controls">
              <input
                type="text"
                className="chain-search-input"
                placeholder="Filter chains..."
                value={chainSearch}
                onChange={(e) => setChainSearch(e.target.value)}
              />
              <div className="chain-pills">
                <button
                  onClick={() => setSelectedChain("all")}
                  className={selectedChain === "all" ? "active" : ""}
                >
                  All
                </button>
                {filteredChains.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => setSelectedChain(chain.id)}
                    className={selectedChain === chain.id ? "active" : ""}
                  >
                    {chain.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <motion.div
          className="results-grid"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          key={`${selectedCategory}-${selectedChain}-${searchTerm}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredSites.map((site) => (
              <motion.a
                layout
                key={site.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  exit: {
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  },
                }}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="site-card"
              >
                <div className="logo-wrapper">
                  <img
                    src={getLogo(site.url)}
                    alt=""
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/128?text=W3")
                    }
                  />
                </div>
                <div className="site-info">
                  <h3>{site.name}</h3>
                  <p>{new URL(site.url).hostname}</p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
