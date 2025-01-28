import PropTypes from "prop-types";
import moment from "moment";
import "./card.scss";
import { FaMapMarkerAlt as Mark } from "react-icons/fa";
import { FaCalendarAlt as Calendar } from "react-icons/fa";
import DeleteButton from "./delete-button";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

const Card = ({ job }) => {
  const date =
    job.status === "In Progress"
      ? "Applied " + moment(job.date).fromNow()
      : job.status === "Rejected"
      ? "Rejected " +
        new Date(job.rejection_date).toLocaleDateString("en", {
          day: "2-digit",
          month: "short",
        })
      : moment(job.interview_date).format("MMMM Do YYYY, h:mm a");

  return (
    <div className="card">
      <div className="head">
        <div>
          <h1 className="letter">
            <span>{job.company[0]}</span>
          </h1>

          <div>
            <h2 className="role">{job.position}</h2>
            <h5 className="comp">{job.company}</h5>
          </div>
        </div>

        <div className="buttons">
          <Link to={`/job/${job.id}`} className="edit">
            <MdEdit />
          </Link>
          <DeleteButton id={job.id} />
        </div>
      </div>

      <div className="line" />

      <div className="body">
        <p className="loc">
          <Mark className="icon" />
          {job.location}
        </p>

        <div className="bottom">
          <span className="date">
            <Calendar className="icon" />
            {date}
          </span>

          <span className="type">{job.type}</span>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rejection_date: PropTypes.string,
    interview_date: PropTypes.string,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
