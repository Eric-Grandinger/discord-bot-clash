CREATE TABLE IF NOT EXISTS clashDataCache(
  id INTEGER PRIMARY KEY,
  themeId INTEGER NOT NULL,
  nameKey TEXT NOT NULL,
  notifiedUsers INTEGER DEFAULT 0  
  CHECK(notifiedUsers IN (0,1))
);

CREATE TABLE IF NOT EXISTS clashScheduleCache(
  idOfClash INTEGER PRIMARY KEY,
  registrationTime INTEGER NOT NULL,
  startTime INTEGER NOT NULL,
  cancelled INTEGER NOT NULL
  CHECK(cancelled IN (0,1)),
  scheduleSet INTEGER DEFAULT 0
  CHECK(scheduleSet IN (0,1)),
  FOREIGN KEY(idOfClash) REFERENCES clashDataCache(id)
);
CREATE TABLE IF NOT EXISTS signedUp(
  idOfClash INTEGER NOT NULL,
  userId TEXT NOT NULL,
  PRIMARY KEY(idOfClash,userId),
  FOREIGN KEY(idOfClash) REFERENCES clashDataCache(id)
);
CREATE TABLE IF NOT EXISTS signedUpReserve(
  idOfClash INTEGER NOT NULL,
  userId TEXT NOT NULL,
  PRIMARY KEY(idOfClash,userId),
  FOREIGN KEY(idOfClash) REFERENCES clashDataCache(id)
);
CREATE TABLE IF NOT EXISTS errorInformation(
  errorMsg TEXT,
  time TEXT,
  PRIMARY KEY(errorMsg,time)
);
