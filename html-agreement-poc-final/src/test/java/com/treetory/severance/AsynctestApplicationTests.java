package com.treetory.severance;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.util.concurrent.ListenableFutureTask;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * 출처 : https://www.hungrydiver.co.kr/bbs/detail/develop?id=2
 *
 * 비동기 호출 테스트
 */
@SpringBootTest
class AsynctestApplicationTests {

    // TEST 용 runnable
    Runnable task_r = () -> {
        System.out.println(String.format("[%s] TASK start", this.getClass().getCanonicalName()));
        try {
            TimeUnit.SECONDS.sleep(11);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println(String.format("[%s] TASK completed", this.getClass().getCanonicalName()));
    };

    @Test
    void completableFutureTest()  throws Exception {

        CompletableFuture
                .runAsync(task_r)
                //.thenCompose(aVoid -> CompletableFuture.runAsync(task_r))
                .thenAccept(aVoid -> System.out.println("All Tasks is completed!!"))
                .exceptionally(throwable -> {
                   System.out.println(throwable.getMessage());
                   return null;
                });

        try {
            TimeUnit.SECONDS.sleep(21);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

    }

    // TEST 용 callable
    Callable task_c = () -> {
        try {
            TimeUnit.SECONDS.sleep(5l);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("TASK completed");
        return null;
    };

    @Test
    public void listenableFuture() throws Exception {
        ListenableFutureTask listenableFutureTask = new ListenableFutureTask(task_c);
        listenableFutureTask.addCallback(new ListenableFutureCallback() {
            @Override
            public void onFailure(Throwable throwable) {
                System.out.println("exception occurred!!");
            }

            @Override
            public void onSuccess(Object o) {
                ListenableFutureTask listenableFuture = new ListenableFutureTask(task_c);
                listenableFuture.addCallback(new ListenableFutureCallback() {
                    @Override
                    public void onFailure(Throwable throwable) {
                        System.out.println("exception occurred!!");
                    }

                    @Override
                    public void onSuccess(Object o) {
                        System.out.println("all tasks completed!!");
                    }
                });
                listenableFuture.run();
            }
        });
        listenableFutureTask.run();

        try {
            TimeUnit.SECONDS.sleep(15l);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    static class Price {
        public double getPrice(double oldPrice) throws Exception {
            return calculatePrice(oldPrice);
        }

        public double calculatePrice(double oldPrice) throws Exception {
            System.out.println("Input :" + oldPrice);
            Thread.sleep(1000l);
            System.out.println("Output :" + (oldPrice + 1l));
            return oldPrice + 1l;
        }

        public CompletableFuture<Double> getPriceAsync(double oldPrice) {
            CompletableFuture<Double> completableFuture = new CompletableFuture<>();
            new Thread(() -> {
                try {
                    double price = calculatePrice(oldPrice);
                    completableFuture.complete(price);
                } catch (Exception ex) {
                    completableFuture.completeExceptionally(ex);
                }
            }).start();

            return completableFuture;
        }
    }

    /**
     * CompletableFuture 를 반환하는 Method를 Chain으로 실행하고 싶을때...
     * 즉 이전에 Async 프로세스로 응답 받은 값을 다음 Async 프로세스의 인자로 사용하는 경우에 아래와 같이 thenCompose, thenComposeAsync 를 사용할 수 있다.
     *
     * @throws Exception
     */
    @Test
    public void thenComposeTest() throws Exception {
        // 비동기처리 Return 값을 다음 처리의 Parameter 로 사용할때 사용한다
        Price price = new Price();
        price.getPriceAsync(1)
                .thenComposeAsync(price::getPriceAsync)
                .thenComposeAsync(price::getPriceAsync)
                .thenComposeAsync(r -> price.getPriceAsync(r));

        System.out.println("Non Blocking!!");

        // main thread 가 죽으면 child 도 다 죽어 버려서 대기함.
        try {
            TimeUnit.SECONDS.sleep(5l);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /**
     * 두가지 프로세스를 parallel 하게 동시에 진행하고 결과 값을 조합한 처리를 할때...
     *
     * @throws Exception
     */
    @Test
    public void thenCombineTest() throws Exception {
        // 두개의 비동기 요청을 동시에 진행해서 조합 할 수 있다.
        Price price = new Price();
        CompletableFuture<Double> price1 = price.getPriceAsync(1);
        CompletableFuture<Double> price2 = price.getPriceAsync(2);
        price2.thenCombineAsync(price1, (a, b) -> a + b)
                .thenAcceptAsync(System.out::print);

        System.out.println("Non Blocking!!");

        // main thread 가 죽으면 child 도 다 죽어 버려서 대기함.
        Thread.sleep(5000l);
    }

    private String buildMessage() {
        return this.buildMessage(0);
    }

    private String buildMessage(int index) {
        try {
            Thread.sleep(5 * 1000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return index > 0 ? "Completed!! [" + index + "]" : "Completed!!";
    }

    /**
     * 동시에 n개의 요청을 호출하고 모든 호출이 완성되면 진행하기
     *
     * @throws Exception
     */
    @Test
    public void allOfTest() throws Exception {
        CompletableFuture<String> cf1 = CompletableFuture.supplyAsync(this::buildMessage);
        CompletableFuture<String> cf2 = CompletableFuture.supplyAsync(this::buildMessage);
        CompletableFuture<String> cf3 = CompletableFuture.supplyAsync(this::buildMessage);

        List<CompletableFuture<String>> completableFutures = Arrays.asList(cf1, cf2, cf3);


        CompletableFuture
                .allOf(completableFutures.toArray(new CompletableFuture[3]))
                .thenApplyAsync(result -> completableFutures.stream().map(future -> future.join()).collect(Collectors.toList()))
                .thenAcceptAsync(messages -> messages.forEach(message -> System.out.println(message)));

        Thread.sleep(11 * 1000L);
    }

    /**
     * 동시에 n개의 요청을 호출하고 모든 호출이 완성되면 진행하기
     *
     * @throws Exception
     */
    @Test
    public void anyOfAllTest() throws Exception {
        CompletableFuture<String> cf1 = CompletableFuture.supplyAsync(() -> buildMessage(1));
        CompletableFuture<String> cf2 = CompletableFuture.supplyAsync(() -> buildMessage(2));
        CompletableFuture<String> cf3 = CompletableFuture.supplyAsync(() -> buildMessage(3));

        List<CompletableFuture<String>> completableFutures = Arrays.asList(cf1, cf2, cf3);

        CompletableFuture
                .anyOf(completableFutures.toArray(new CompletableFuture[3]))
                .thenAcceptAsync(result -> System.out.println(result));

        Thread.sleep(11 * 1000L);
    }

    /**
     * ListenableFuture 를 CompletableFuture로 변환하기
     * -> 하지만 스프링프레임워크 5.0 부터 completable() 이라는 메소드를 호출하면 간단히 CompletableFuture 로 변환
     */
    public static class AsyncUtil {

        public static <T> CompletableFuture<T> buildCompletableFuture(ListenableFuture<T> listenableFuture) {
            CompletableFuture<T> completableFuture = new CompletableFuture<T>() {
                @Override
                public boolean cancel(boolean mayInterruptIfRunning) {
                    boolean result = listenableFuture.cancel(mayInterruptIfRunning);
                    super.cancel(mayInterruptIfRunning);
                    return result;
                }
            };
            listenableFuture.addCallback(new ListenableFutureCallback<T>() {
                @Override
                public void onFailure(Throwable ex) {
                    completableFuture.completeExceptionally(ex);
                }

                @Override
                public void onSuccess(T result) {
                    completableFuture.complete(result);
                }
            });
            return completableFuture;
        }

        public static <T> CompletableFuture<T> doNothingCompletableFuture() {
            CompletableFuture<T> completableFuture = new CompletableFuture<>();
            completableFuture.complete(null);
            return completableFuture;
        }
    }
}
