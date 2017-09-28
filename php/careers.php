<?php
    $conn = mysqli_connect("localhost", "root", "root", "academic_stats") or die(mysqli_connect_error($conn));
    $id = $_GET['id'];
    $query = mysqli_query($conn, "SELECT T1.degreeID, GROUP_CONCAT(T2.description SEPARATOR '||') AS jobs
                                  FROM stats_degree_lookup AS T1
                                  INNER JOIN bls_jobs_2017 AS T2 
                                  ON T2.jobID = T1.statsID
                                  WHERE degreeID = $id
                                  GROUP BY degreeID"
                                );
    
    $result = [];
    while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
        array_push($result, $row);
    }
    print json_encode($result);
?>