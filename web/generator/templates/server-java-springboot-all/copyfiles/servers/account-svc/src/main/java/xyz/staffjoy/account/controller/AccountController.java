package xyz.staffjoy.account.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.structlog4j.ILogger;
import com.github.structlog4j.SLoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import xyz.staffjoy.account.dto.*;
import xyz.staffjoy.account.props.AppProps;
import xyz.staffjoy.account.service.AccountService;
import xyz.staffjoy.common.api.BaseResponse;
import xyz.staffjoy.common.auth.*;
import xyz.staffjoy.common.crypto.Sign;
import xyz.staffjoy.common.env.EnvConfig;
import xyz.staffjoy.common.env.EnvConstant;
import xyz.staffjoy.common.error.ServiceException;
import xyz.staffjoy.common.validation.PhoneNumber;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/v1/account")
@Validated
public class AccountController {

    static final ILogger logger = SLoggerFactory.getLogger(AccountController.class);

    @Autowired
    private AccountService accountService;

    @Autowired
    private EnvConfig envConfig;

    @Autowired
    private AppProps appProps;
//    @Autowired
//    private HelperService helperService;

    // GetOrCreate is for internal use by other APIs to match a user based on their phonenumber or email.
    @PostMapping(path = "/get_or_create")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_SUPPORT_USER,
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_COMPANY_SERVICE
    })
    public GenericAccountResponse getOrCreate(@RequestBody @Valid GetOrCreateRequest request) {
        AccountDto accountDto = accountService.getOrCreate(request.getName(), request.getEmail(), request.getPhoneNumber());
        GenericAccountResponse genericAccountResponse = new GenericAccountResponse(accountDto);
        return genericAccountResponse;
    }

    @PostMapping(path = "/create")
    @Authorize(value = {
                    AuthConstant.AUTHORIZATION_SUPPORT_USER,
                    AuthConstant.AUTHORIZATION_WWW_SERVICE,
                    AuthConstant.AUTHORIZATION_COMPANY_SERVICE
    })
    public GenericAccountResponse createAccount(@RequestBody @Valid CreateAccountRequest request) {
        AccountDto accountDto = accountService.create(request.getName(), request.getEmail(), request.getPhoneNumber());
        GenericAccountResponse genericAccountResponse = new GenericAccountResponse(accountDto);
        return genericAccountResponse;
    }

    @GetMapping(path = "/get_account_by_phonenumber")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_SUPPORT_USER,
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_COMPANY_SERVICE
    })
    public GenericAccountResponse getAccountByPhonenumber(@RequestParam @PhoneNumber String phoneNumber) {
        AccountDto accountDto = accountService.getAccountByPhoneNumber(phoneNumber);
        GenericAccountResponse genericAccountResponse = new GenericAccountResponse(accountDto);
        return genericAccountResponse;
    }

    @GetMapping(path = "/list")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_SUPPORT_USER
    })
    public ListAccountResponse listAccounts(@RequestParam int offset, @RequestParam @Min(0) int limit) {
        AccountList accountList = accountService.list(offset, limit);
        ListAccountResponse listAccountResponse = new ListAccountResponse(accountList);
        return listAccountResponse;
    }

    @GetMapping(path = "/get")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_ACCOUNT_SERVICE,
            AuthConstant.AUTHORIZATION_COMPANY_SERVICE,
            AuthConstant.AUTHORIZATION_WHOAMI_SERVICE,
            AuthConstant.AUTHORIZATION_BOT_SERVICE,
            AuthConstant.AUTHORIZATION_AUTHENTICATED_USER,
            AuthConstant.AUTHORIZATION_SUPPORT_USER,
            AuthConstant.AUTHORIZATION_SUPERPOWERS_SERVICE
    })
    public GenericAccountResponse getAccount(@RequestParam @NotBlank String userId) {
        this.validateAuthenticatedUser(userId);
        this.validateEnv();

        AccountDto accountDto = accountService.get(userId);

        GenericAccountResponse genericAccountResponse = new GenericAccountResponse(accountDto);
        return genericAccountResponse;
    }

    @PutMapping(path = "/update")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_COMPANY_SERVICE,
            AuthConstant.AUTHORIZATION_AUTHENTICATED_USER,
            AuthConstant.AUTHORIZATION_SUPPORT_USER,
            AuthConstant.AUTHORIZATION_SUPERPOWERS_SERVICE
    })
    public GenericAccountResponse updateAccount(@RequestBody @Valid AccountDto newAccountDto) {
        this.validateAuthenticatedUser(newAccountDto.getId());
        this.validateEnv();

        AccountDto accountDto =  accountService.update(newAccountDto);

        GenericAccountResponse genericAccountResponse = new GenericAccountResponse(accountDto);
        return genericAccountResponse;
    }

    @PutMapping(path = "/update_password")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_AUTHENTICATED_USER,
            AuthConstant.AUTHORIZATION_SUPPORT_USER
    })
    public BaseResponse updatePassword(@RequestBody @Valid UpdatePasswordRequest request) {
        this.validateAuthenticatedUser(request.getUserId());

        accountService.updatePassword(request.getUserId(), request.getPassword());

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("password updated");

        return baseResponse;
    }

    @PostMapping(path = "/verify_password")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_SUPPORT_USER
    })
    public GenericAccountResponse verifyPassword(@RequestBody @Valid VerifyPasswordRequest request) {
        AccountDto accountDto = accountService.verifyPassword(request.getEmail(), request.getPassword());

        GenericAccountResponse genericAccountResponse = new GenericAccountResponse(accountDto);
        return genericAccountResponse;
    }

    // RequestPasswordReset sends an email to a user with a password reset link
    @PostMapping(path = "/request_password_reset")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_SUPPORT_USER
    })
    public BaseResponse requestPasswordReset(@RequestBody @Valid PasswordResetRequest request) {
        accountService.requestPasswordReset(request.getEmail());

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("password reset requested");

        return baseResponse;
    }

    // RequestPasswordReset sends an email to a user with a password reset link
    @PostMapping(path = "/request_email_change")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_AUTHENTICATED_USER,
            AuthConstant.AUTHORIZATION_SUPPORT_USER
    })
    public BaseResponse requestEmailChange(@RequestBody @Valid EmailChangeRequest request) {
        this.validateAuthenticatedUser(request.getUserId());

        accountService.requestEmailChange(request.getUserId(), request.getEmail());

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("email change requested");

        return baseResponse;
    }

    // ChangeEmail sets an account to active and updates its email. It is
    // used after a user clicks a confirmation link in their email.
    @PostMapping(path = "/change_email")
    @Authorize(value = {
            AuthConstant.AUTHORIZATION_WWW_SERVICE,
            AuthConstant.AUTHORIZATION_SUPPORT_USER
    })
    public BaseResponse changeEmail(@RequestBody @Valid EmailConfirmation request) {
        accountService.changeEmailAndActivateAccount(request.getUserId(), request.getEmail());

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("email change requested");

        return baseResponse;
    }

    @PostMapping(path = "/track_event")
    public BaseResponse trackEvent(@RequestBody @Valid TrackEventRequest request) {
        accountService.trackEvent(request.getUserId(), request.getEvent());

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("event tracked");

        return baseResponse;
    }

    @PostMapping(path = "/sync_user")
    public BaseResponse syncUser(@RequestBody @Valid SyncUserRequest request) {
        accountService.syncUser(request.getUserId());

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("user synced");

        return baseResponse;
    }


    @RequestMapping(value = "/login")
    public BaseResponse login(@RequestParam(value="return_to", required = false) String returnTo, // POST and GET are in the same handler - reset
                        @RequestParam(value="email", required = false) String email,
                        @RequestParam(value="password", required = false) String password,
                        // rememberMe=True means that the session is set for a month instead of a day
                        @RequestParam(value="remember-me", required = false) String rememberMe,
                        HttpServletRequest request,
                        HttpServletResponse response) {


            AccountDto account = null;
            GenericAccountResponse genericAccountResponse = null;
            try {
                VerifyPasswordRequest verifyPasswordRequest = VerifyPasswordRequest.builder()
                        .email(email)
                        .password(password)
                        .build();
                genericAccountResponse = this.verifyPassword(verifyPasswordRequest);
            } catch (Exception ex) {
                //helperService.logException(logger, ex, "fail to verify user password");
            }
            if (genericAccountResponse != null) {
                if (!genericAccountResponse.isSuccess()) {
                    //helperService.logError(logger, genericAccountResponse.getMessage());
                } else {
                    account = genericAccountResponse.getAccount();
                }
            }

            if (account != null) { // login success
                // set cookie
                Sessions.loginUser(account.getId(),
                        account.isSupport(),
                        !StringUtils.isEmpty(rememberMe),
                        appProps.getSigningSecret(),
                        envConfig.getExternalApex(),
                        response);
            }

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("login success");

        return baseResponse;
    }

    @GetMapping(path = "/verifyJWTToken")
    public BaseResponse verifyJWTToken(@RequestHeader("Authorization") String tokenString,
            //@RequestParam(value="") String tokenString,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response){
        //String token = Sessions.getToken(request);
        //if (token == null) return null;
        String userId = "";
        try {
            DecodedJWT decodedJWT = Sign.verifySessionToken(tokenString, appProps.getSigningSecret());
            userId = decodedJWT.getClaim(Sign.CLAIM_USER_ID).asString();
            //boolean support = decodedJWT.getClaim(Sign.CLAIM_SUPPORT).asBoolean();

        } catch (Exception e) {
            //log.error("fail to verify token");
            System.out.println("fail to verify token");
            e.printStackTrace();
            return null;
        }

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("login success" + userId);
        return baseResponse;
    }
    private void validateAuthenticatedUser(String userId) {
        if (AuthConstant.AUTHORIZATION_AUTHENTICATED_USER.equals(AuthContext.getAuthz())) {
            String currentUserId = AuthContext.getUserId();
            if (StringUtils.isEmpty(currentUserId)) {
                throw new ServiceException("failed to find current user id");
            }
            if (!userId.equals(currentUserId)) {
                throw new PermissionDeniedException("You do not have access to this service");
            }
        }
    }

    private void validateEnv() {
        if (AuthConstant.AUTHORIZATION_SUPERPOWERS_SERVICE.equals(AuthContext.getAuthz())) {
            if (!EnvConstant.ENV_DEV.equals(this.envConfig.getName())) {
                logger.warn("Development service trying to connect outside development environment");
                throw new PermissionDeniedException("This service is not available outside development environments");
            }
        }
    }





}
