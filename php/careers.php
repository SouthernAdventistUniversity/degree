<?php
    $conn = mysqli_connect("localhost", "catalog_user", ".login.options.chatt.", "academic_stats") or die(mysqli_connect_error($conn));
    $id = $_GET['id'];
    $query = mysqli_query($conn, "SELECT 
                                T1.degreeID, 
                                    TRIM(T2.description) AS jobs, 
									TRIM(T2.salary) AS salary
                                  FROM stats_degree_lookup AS T1
                                  INNER JOIN bls_jobs_2017 AS T2
                                  ON T2.jobID = T1.statsID
                                  WHERE degreeID = $id
                                  GROUP BY T2.description"
                                );
    
    $result = [];
    while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) { 
        array_push($result, $row);
    }
    print json_encode($result);
?>
