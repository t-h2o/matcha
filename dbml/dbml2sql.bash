#!/bin/bash

if [ -z "$1" ] ; then
	echo missing 1 argument
	exit 1
fi

if [ -z "$2" ] ; then
	echo missing 2 argument
	exit 1
fi

cp $1 $2

sed -i 's/Table/CREATE TABLE/' $2
sed -i 's/integer/int/' $2
sed -i 's/\s\[.*\]//' $2
sed -i 's/{/(/' $2
sed -i 's/}/);/' $2
sed -i 's/Ref.*//' $2
perl -pi -0 -w -e "s/\n\n+/\n/g" $2
# grep -v Ref $2 | cat > $2
