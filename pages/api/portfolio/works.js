import data from "../../../data/jobs.json";

export default function handler(req, res) {
  res.status(200).json({ results: data });
}