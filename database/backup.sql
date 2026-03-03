CREATE TABLE IF NOT EXISTS clashDateCache(
  id INTEGER PRIMARY KEY,
  themeId INTEGER NOT NULL,
  nameKey TEXT NOT NULL,
  notifiedUsers INTEGER NOT NULL CHECK(clashDateCache.notifiedUsers IN(
    0,
    1
  ))
);
CREATE TABLE IF NOT EXISTS clashDateCacheSchedule(
  idOfClash INTEGER PRIMARY KEY,
  registrationTime INTEGER NOT NULL,
  startTime INTEGER NOT NULL,
  cancelled INTEGER NOT NULL CHECK(
    clashDateCacheSchedule.cancelled IN(
      0,
      1),
      scheduleSet INTEGER NOT NULL CHECK(
        clashDateCacheSchedule.cancelled IN(
          0,
          1)),
          FOREIGN KEY(
            idOfClash)REFERENCES clashDateCache(
              id));

)CREATE TABLE IF NOT EXISTS signedUp(
  idOfClash INTEGER NOT NULL,
  userId TEXT NOT NULL PRIMARY KEY(
    idOfClash,
    userId
  ),
  FOREIGN KEY(idOfClash) REFERENCES clashDateCache(id)
);
CREATE TABLE IF NOT EXISTS signedUpReserve(
  idOfClash INTEGER NOT NULL,
  userId TEXT NOT NULL PRIMARY KEY(
    idOfClash,
    userId
  ),
  FOREIGN KEY(idOfClash) REFERENCES clashDateCache(id)
);
CREATE TABLE IF NOT EXISTS errorInformation(
  errorMsg TEXT,
  TIME TEXT,
  PRIMARY KEY(errorMsg TIME)
);
CREATE FUNCTION isNotificationTimerSet(idOfClash INTEGER) RETURNS REAL AS BEGIN DECLARE total REAL;
SELECT
  SUM(price) INTO total
FROM
  products
WHERE
  category_id = category_id;
RETURN total;

END;
CREATE FUNCTION insertClashDateCache(idOfClash INTEGER) RETURNS REAL AS BEGIN
END;
CREATE FUNCTION insertClashDateCacheSchedule(idOfClash INTEGER) RETURNS REAL AS BEGIN DECLARE total REAL;
SELECT
  SUM(price) INTO total
FROM
  products
WHERE
  category_id = category_id;
RETURN total;

END;
