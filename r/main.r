source("get_connection.r")

con <- get_connection_db()
listtables <- dbListTables(con)

listtables
svg("example_plot.svg")
plot(1:10)
dev.off()
