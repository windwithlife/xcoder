package com.simple.bz.dto;

import com.simple.bz.model.ApplicationType;
import com.simple.bz.model.ProjectModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReleaseDetail {
    private Long   id;
    private String name;
    private String description;
    private String path;
    private String repository;
    private String repositoryBranch;
    private String targetPath;
    private boolean useOwnDeploymentFile;
    private String releaseVersion;
    private String applicationName;
    private String domainName;
    private String domainNameUAT;
    private Long   buildId;
    private String envType;
    private ProjectModel projectInfo;
    private ApplicationType applicationTypeInfo;
}
