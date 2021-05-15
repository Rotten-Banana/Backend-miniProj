const validateStudentType = (type) => {
  if (type === "S") return true;
  return false;
};

const validateStudentTypeId = (type_id) => {
  if (type_id.includes("S")) return true;
  return false;
};

const validateTeacherType = (type) => {
  if (type === "T") return true;
  return false;
};

const validateTeacherTypeId = (type_id) => {
  if (type_id.includes("T")) return true;
  return false;
};

module.exports = {
  validateStudentType,
  validateStudentTypeId,
  validateTeacherType,
  validateTeacherTypeId,
};
