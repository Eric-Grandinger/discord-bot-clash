CREATE TABLE clashDateCache(
  id INTEGER PRIMARY KEY,
  themeId INTEGER NOT NULL,
  nameKey TEXT NOT NULL,
  nameKeySecondary TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE
);
CREATE TABLE clashDateCacheSchedule(
  id INTEGER PRIMARY KEY,
  registrationTime INTEGER NOT NULL,
  startTime TIME NOT NULL,
  cancelled BOOL NOT NULL
);
