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
  cancelled INTEGER NOT NULL CHECK(clashDateCacheSchedule.cancelled IN(0,
  1)),
  FOREIGN KEY(idOfClash) REFERENCES clashDateCache(id)
);
CREATE TABLE IF NOT EXISTS signedUp(
  idOfClash INTEGER NOT NULL,
  userId TEXT NOT NULL,
  PRIMARY KEY(idOfClash,
  userId),
  FOREIGN KEY(idOfClash) REFERENCES clashDateCache(id)
);
CREATE TABLE IF NOT EXISTS signedUpReserve(
  idOfClash INTEGER NOT NULL,
  userId TEXT NOT NULL,
  PRIMARY KEY(idOfClash,
  userId),
  FOREIGN KEY(idOfClash) REFERENCES clashDateCache(id)
);
/*CREATE FUNCTION function_name(param1, param2,) RETURNS return_type AS
BEGIN
        -- SQL statement
END ;
/*  TODO Add triggers to move a player if signed up is full to
   TODO Remove old data not nessisary any more
   */
