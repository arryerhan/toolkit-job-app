import { statusOptions, typeOptions } from "../../utils/constants";
import Input from "./input";
import "./form.scss";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { createJob, updateJob } from "../../redux/slices/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getJob } from "../../utils/service";
import { IoCloseSharp as Close } from "react-icons/io5";

const Form = () => {
  const [editItem, setEditItem] = useState(null);
  const [status, setStatus] = useState(editItem?.status || "Interview");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useParams();

  useEffect(() => {
    if (mode === "create") return setEditItem(null);

    getJob(mode).then((data) => {
      setEditItem(data);
      setStatus(data.status);
    });
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());

    if (!editItem) {
      api
        .post("/jobs", jobData)
        .then((res) => {
          dispatch(createJob(res.data));
          navigate("/");
          toast.success("Application created");
        })
        .catch((err) => {
          toast.error("Application creation failed");
          console.error(err);
        });
    } else {
      api
        .patch(`/jobs/${editItem.id}`, jobData)
        .then((res) => {
          dispatch(updateJob(res.data));
          navigate("/");
          toast.success("Updated successfully");
        })
        .catch((err) => {
          toast.error("Update failed");
          console.error(err);
        });
    }
  };

  const dateName =
    editItem?.status === "Interview"
      ? "interview_date"
      : editItem?.status === "Rejected"
      ? "rejection_date"
      : "date";

  const dateValue =
    editItem &&
    new Date(editItem[dateName])
      .toISOString()
      .slice(0, editItem.status === "Interview" ? 16 : 10);

  const handleClose = () => { navigate("/")};

  return (
    <div className="create-page">
      <section>
        <Close className="close-btn" onClick={handleClose} />

        <h2>{editItem ? "Update Application" : "Create New Application"}</h2>

        <form onSubmit={handleSubmit}>
          <Input label="Position" name="position" value={editItem?.position} />
          <Input label="Company" name="company" value={editItem?.company} />
          <Input label="Location" name="location" value={editItem?.location} />

          <Input
            label="Status"
            name="status"
            options={statusOptions}
            handleChange={(e) => setStatus(e.target.value)}
            value={editItem?.status}
          />

          <Input
            label="Type"
            name="type"
            options={typeOptions}
            value={editItem?.type}
          />

          <Input
            label={
              status === "Interview"
                ? "Interview Date"
                : status === "Rejected"
                ? "Rejected Date"
                : "Application Date"
            }
            name={
              status === "Interview"
                ? "interview_date"
                : status === "Rejected"
                ? "rejection_date"
                : "date"
            }
            type={status === "Interview" ? "datetime-local" : "date"}
            value={dateValue}
          />

          <div className="btn-wrapper">
            <button>{editItem ? "Save" : "Create"}</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
