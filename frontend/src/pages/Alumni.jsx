import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "./Alumni.css";

const Alumni = () => {
  const navigate = useNavigate();
  const { alumniId } = useParams();
  const location = useLocation();

  const [alumniList, setAlumniList] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedAlumni, setRelatedAlumni] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const [batchFilter, setBatchFilter] = useState(queryParams.get("batch") || "");
  const [schoolFilter, setSchoolFilter] = useState(queryParams.get("school") || "");

  const fetchAlumni = async (batch = "", school = "") => {
    try {
      setLoading(true);
      let url = "/api/alumni/";
      const params = [];
      if (batch) params.push(`batch=${batch}`);
      if (school) params.push(`school=${school}`);
      if (params.length > 0) url += "?" + params.join("&");

      const response = await axiosInstance.get(url);
      setAlumniList(response.data);

      if (alumniId) {
        const alumni = response.data.find(a => a.id === parseInt(alumniId));
        if (alumni) setSelectedAlumni(alumni);
      }
    } catch (err) {
      console.error("Error fetching alumni:", err);
      alert("Failed to load alumni");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni(batchFilter, schoolFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alumniId]);

  useEffect(() => {
    if (selectedAlumni) {
      const related = alumniList.filter(
        a => a.school === selectedAlumni.school && a.id !== selectedAlumni.id
      );
      setRelatedAlumni(related.slice(0, 4));
    }
  }, [selectedAlumni, alumniList]);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (batchFilter) params.set("batch", batchFilter);
    if (schoolFilter) params.set("school", schoolFilter);

    navigate({ pathname: "/alumni", search: params.toString() });
    fetchAlumni(batchFilter, schoolFilter);
  };

  if (loading) return <div>Loading alumni...</div>;

  // Full profile view
  if (selectedAlumni) {
    const alumni = selectedAlumni;
    return (
      <div className="alumni-wrapper">
        <button
          className="back-btn"
          onClick={() => {
            setSelectedAlumni(null);
            navigate({ pathname: "/alumni", search: location.search });
          }}
        >
          ← Back to Alumni Directory
        </button>

        <div className="alumni-full-profile">
          <img
            src={alumni.profile_image || "/default-avatar.png"}
            alt={alumni.username}
            className="alumni-image-large"
          />
          <h2>{alumni.first_name} {alumni.last_name}</h2>
          <p><strong>Email:</strong> {alumni.email}</p>
          <p><strong>School:</strong> {alumni.school}</p>
          <p><strong>Specialization:</strong> {alumni.specialization || "N/A"}</p>
          <p><strong>Batch:</strong> {alumni.batch_year}</p>
          <p><strong>Bio:</strong> {alumni.bio || "No bio available."}</p>

          <div className="alumni-links">
            {alumni.linkedin_url && (
              <a href={alumni.linkedin_url} target="_blank" rel="noreferrer" className="linkedin">
                LinkedIn
              </a>
            )}
            {alumni.github_url && (
              <a href={alumni.github_url} target="_blank" rel="noreferrer" className="github">
                GitHub
              </a>
            )}
            {alumni.portfolio_url && (
              <a href={alumni.portfolio_url} target="_blank" rel="noreferrer" className="portfolio">
                Portfolio
              </a>
            )}
          </div>

          <div className="alumni-actions">
            <button className="email" onClick={() => window.location = `mailto:${alumni.email}`}>Send Email</button>
            <button className="call" onClick={() => alert(`Call ${alumni.first_name}`)}>Call</button>
          </div>
        </div>

        {/* Related Alumni */}
        {relatedAlumni.length > 0 && (
          <div className="related-alumni">
            <h3>Related Alumni from {selectedAlumni.school}</h3>
            <div className="alumni-grid">
              {relatedAlumni.map(a => (
                <div key={a.id} className="alumni-card small">
                  <img
                    src={a.profile_image || "/default-avatar.png"}
                    alt={a.username}
                    className="alumni-image"
                  />
                  <h4>{a.first_name} {a.last_name}</h4>
                  <p>{a.school} ({a.batch_year})</p>
                  <button
                    onClick={() => {
                      setSelectedAlumni(a);
                      navigate(`/alumni/${a.id}${location.search}`);
                    }}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Alumni grid view
  return (
    <div className="alumni-wrapper">
      <h1>Alumni Directory</h1>

      <div className="alumni-filters">
        <input
          type="number"
          placeholder="Batch Year"
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
        />
        <select value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}>
          <option value="">All Schools</option>
          <option value="SoT">School of Technology</option>
          <option value="SoM">School of Management</option>
          <option value="SoL">School of Law</option>
          <option value="SoD">School of Design</option>
          <option value="SoHS">School of Health Sciences</option>
          <option value="SoSS">School of Social Sciences</option>
        </select>
        <button onClick={handleFilter}>Apply Filter</button>
      </div>

      <div className="alumni-grid">
        {alumniList.map(alumni => (
          <div key={alumni.id} className="alumni-card">
            <img
              src={alumni.profile_image || "/default-avatar.png"}
              alt={alumni.username}
              className="alumni-image"
            />
            <h3>{alumni.first_name} {alumni.last_name}</h3>
            <p>{alumni.school} ({alumni.batch_year})</p>
            <button
              onClick={() => {
                setSelectedAlumni(alumni);
                navigate(`/alumni/${alumni.id}${location.search}`);
              }}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alumni;
