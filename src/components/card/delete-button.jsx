import PropTypes from "prop-types"; 
import { FaTrashAlt } from "react-icons/fa";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteJob } from "../../redux/slices/jobSlice";

const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!confirm("Please confirm to delete!")) return;

    api
      .delete(`/jobs/${id}`)
      .then(() => {
        dispatch(deleteJob(id));
        toast.success("The application has been removed from the list.");
      })
      .catch((err) => {
        toast.error("An error occurred");
        console.error(err);
      });
  };

  return (
    <button className="delete" onClick={handleDelete}>
      <FaTrashAlt />
    </button>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DeleteButton;
