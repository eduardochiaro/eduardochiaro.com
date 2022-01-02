import data from "../../../data/apps.json";

export default function handler(req, res) {
  res.status(200).json({ results: data });
}