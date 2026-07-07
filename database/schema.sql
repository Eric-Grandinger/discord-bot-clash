CREATE TABLE IF NOT EXISTS clashDataCache(
  id INTEGER PRIMARY KEY,
  themeId INTEGER NOT NULL,
  nameKey TEXT NOT NULL,
  notifiedUsersDayBefore INTEGER DEFAULT 0,
  notifiedUsersHouerBefore INTEGER DEFAULT 0,  
  CHECK(notifiedUsersDayBefore IN (0,1)),
  CHECK(notifiedUsersHouerBefore IN (0,1))
);

CREATE TABLE IF NOT EXISTS clashScheduleCache(
  idOfClash INTEGER PRIMARY KEY,
  registrationTime INTEGER NOT NULL,
  startTime INTEGER NOT NULL,
  cancelled INTEGER NOT NULL,
  scheduleSet INTEGER DEFAULT 0,
  FOREIGN KEY(idOfClash) REFERENCES clashDataCache(id),
  CHECK(cancelled IN (0,1))
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
  location TEXT,
  errorMsg TEXT,
  time TEXT,
  id INTEGER PRIMARY KEY AUTOINCREMENT
);
