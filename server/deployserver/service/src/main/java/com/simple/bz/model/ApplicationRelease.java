package com.simple.bz.model;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ApplicationRelease implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //名称
    private String name;
    //说明
    private String description;
    private Long projectId;
    private Long applicationTypeId;
    private Long applicationPointId;
    private String path;
    private String repository;
    private String repositoryBranch;
    private String targetPath;
    private String releaseStatus;
    private boolean useOwnDeploymentFile;
    private String releaseVersion;
    private String applicationName;


}

