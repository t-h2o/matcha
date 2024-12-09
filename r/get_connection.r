library(DBI)

readRenviron("../.env")

get_connection_db <- function() {
	db <- Sys.getenv("POSTGRES_NAME")
	host_db <- 'localhost'
	db_port <- '6543'
	db_user <- Sys.getenv("POSTGRES_USER")
	db_password <- Sys.getenv("POSTGRES_PASSWORD")
	drv <- RPostgres::Postgres()
	con <- dbConnect(drv, dbname = db, host=host_db, port=db_port, user=db_user, password=db_password)

	con
}

# con <- get_connection_db
# 
# dbListTables(con) # returns a list of tables in your database
# # dbExistsTable(con, "<table name>") # checks if the table exists in your database
# 
# # You can fetch all results:
# res <- dbSendQuery(con, "SELECT * FROM users WHERE cyl = 4")
# dbFetch(res)
# 
# 
# while(!dbHasCompleted(res)){
#   chunk <- dbFetch(res, n = 5)
#   print(nrow(chunk))
# }
# 
# dbClearResult(res)
# 
# dbDisconnect(con)
